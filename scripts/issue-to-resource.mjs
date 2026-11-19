#!/usr/bin/env node
// Turns a "New Resource request" issue into a listing file in content/resources/.
//
// Used by .github/workflows/resource-request.yml. Reads the issue from the
// GitHub event payload and never runs anything from it: every answer is
// treated as plain text and written into the file with safe quoting.
//
// Usage: node scripts/issue-to-resource.mjs <event.json> <output-dir>
//
// Writes to <output-dir>:
//   result.json     { ok, path?, slug? }
//   pr-title.txt    pull request title (when ok)
//   pr-body.md      pull request description (when ok)
//   comment.md      comment for the issue when answers need fixing (when not ok)

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const RESOURCES_DIR = "content/resources";
const KINDS = ["Code", "Data", "Code and data", "Guide"];

// Headings exactly as they appear in .github/ISSUE_TEMPLATE/resource-request.yml.
// If a label changes there, change it here too.
export const FIELDS = {
  link: "Link to the resource",
  license: "License",
  title: "Resource name",
  summary: "Summary",
  kind: "Type",
  maintainers: "Maintainers",
  relationship: "Your connection to the resource",
  topics: "Topics",
  links: "Other links",
  description: "Longer description",
};

/** Splits an issue form body into { heading: answer }. Empty answers become "". */
export function parseIssueForm(body) {
  const sections = {};
  const parts = body.replace(/\r\n/g, "\n").split(/^### +(.+?)\s*$/m);
  for (let i = 1; i < parts.length; i += 2) {
    const value = parts[i + 1].trim();
    sections[parts[i].trim()] = value === "_No response_" ? "" : value;
  }
  return sections;
}

const lines = (s) =>
  s
    .split("\n")
    .map((l) => l.replace(/^\s*[-*]\s+/, "").trim())
    .filter(Boolean);

/**
 * Where the resource lives. The root of a GitHub repository (or "owner/name")
 * becomes { repo }; any other web address becomes { url }.
 */
export function parseLocation(s) {
  const v = s.trim().replace(/^<|>$/g, "");
  const gh = v
    .replace(/\.git$/, "")
    .replace(/\/+$/, "")
    .match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9-]+)\/([A-Za-z0-9._-]+)$/i);
  if (gh) return { repo: `${gh[1]}/${gh[2]}` };
  if (/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/.test(v)) return { repo: v };
  if (/^https?:\/\/\S+$/.test(v) && URL.canParse(v)) return { url: v };
  return null;
}

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

/** "Name, Institution, @username, email" per line; only the name has to come first. */
export function parseMaintainers(s) {
  return lines(s).map((line) => {
    const m = { name: "" };
    const rest = [];
    for (const raw of line.split(",")) {
      const p = raw.trim().replace(/^<|>$/g, "");
      if (!p) continue;
      const gh = p.match(/^(?:@|https?:\/\/(?:www\.)?github\.com\/)([A-Za-z0-9-]+)\/?$/i);
      if (gh && !m.github) m.github = gh[1];
      else if (EMAIL.test(p.replace(/^mailto:/i, "")) && !m.email) m.email = p.replace(/^mailto:/i, "");
      else rest.push(p);
    }
    m.name = rest[0] ?? "";
    if (rest.length > 1) m.affiliation = rest.slice(1).join(", ");
    return m;
  });
}

/** "Label: https://…" per line, or a bare address (labelled with its site name). */
export function parseLinks(s) {
  return lines(s).map((line) => {
    const m = line.match(/^(?:(.*?)\s*[:\-–]\s+)?<?(https?:\/\/[^\s>]+)>?$/);
    if (!m || !URL.canParse(m[2])) return { error: line };
    const label = (m[1] ?? "").trim() || new URL(m[2]).hostname.replace(/^www\./, "");
    return { label, url: m[2] };
  });
}

export function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

// JSON strings are valid YAML double-quoted strings, so this quotes safely.
const q = (s) => JSON.stringify(s);

/** Validates the answers and returns { errors } or the listing file. */
export function buildListing(sections, { today, existing = { locations: new Map(), slugs: new Set() } }) {
  const get = (k) => sections[FIELDS[k]] ?? "";
  const errors = [];

  const location = parseLocation(get("link"));
  if (!location) {
    errors.push(`**${FIELDS.link}**: use a full web address, like \`https://github.com/owner/repository\` or \`https://zenodo.org/records/1234567\`.`);
  } else {
    const key = (location.repo ?? location.url).toLowerCase().replace(/\/+$/, "");
    if (existing.locations.has(key)) errors.push(`**${FIELDS.link}**: this resource is already listed in \`${existing.locations.get(key)}\`.`);
  }

  const license = get("license").replace(/\s+/g, " ").trim();
  if (location?.url && !license)
    errors.push(`**${FIELDS.license}** is required for resources outside GitHub, for example "CC BY 4.0".`);
  if (license.length > 60) errors.push(`**${FIELDS.license}**: give the license's name (60 characters at most).`);

  const title = get("title").replace(/\s+/g, " ").trim();
  if (!title) errors.push(`**${FIELDS.title}** is required.`);
  else if (title.length > 90) errors.push(`**${FIELDS.title}** is ${title.length} characters; keep it to 90.`);

  const summary = get("summary").replace(/\s+/g, " ").trim();
  if (summary.length < 20 || summary.length > 280)
    errors.push(`**${FIELDS.summary}** is ${summary.length} characters; it needs to be between 20 and 280.`);

  const kind = get("kind").trim();
  if (!KINDS.includes(kind)) errors.push(`**${FIELDS.kind}** must be one of: ${KINDS.join(", ")}.`);

  const maintainers = parseMaintainers(get("maintainers"));
  if (maintainers.length === 0) errors.push(`**${FIELDS.maintainers}**: list at least one person.`);
  maintainers.forEach((m, i) => {
    if (!m.name) errors.push(`**${FIELDS.maintainers}**, line ${i + 1}: start the line with the person's name.`);
  });

  const topics = get("topics")
    .split(/[,\n]/)
    .map((t) => t.replace(/^\s*[-*]\s+/, "").trim())
    .filter(Boolean);
  if (topics.length > 6) errors.push(`**${FIELDS.topics}**: ${topics.length} given; use six at most.`);

  const links = parseLinks(get("links"));
  for (const l of links)
    if (l.error) errors.push(`**${FIELDS.links}**: couldn't read \`${l.error}\`. Use \`Label: https://…\`, one per line.`);

  const fallback = location?.repo ? location.repo.split("/")[1] : "";
  let slug = slugify(title) || slugify(fallback);
  if (slug && existing.slugs.has(slug) && location?.repo) slug = slugify(`${slug}-${location.repo.split("/")[0]}`);
  if (title && !slug) errors.push(`**${FIELDS.title}**: needs at least one letter or number to name the file.`);
  else if (slug && existing.slugs.has(slug))
    errors.push(`A listing named \`${slug}.md\` already exists; choose a different **${FIELDS.title}**.`);

  if (errors.length) return { errors };

  // Raw HTML in the free-text description is escaped; Markdown still works.
  const description = get("description").replace(/</g, "&lt;").trim();

  const out = ["---", `title: ${q(title)}`];
  if (location.repo) out.push(`repo: ${q(location.repo)}`);
  else out.push(`url: ${q(location.url)}`, `license: ${q(license)}`);
  out.push(`summary: ${q(summary)}`, `kind: ${q(kind)}`);
  if (topics.length) out.push("topics:", ...topics.map((t) => `  - ${q(t)}`));
  out.push("maintainers:");
  for (const m of maintainers) {
    out.push(`  - name: ${q(m.name)}`);
    if (m.affiliation) out.push(`    affiliation: ${q(m.affiliation)}`);
    if (m.github) out.push(`    github: ${q(m.github)}`);
    if (m.email) out.push(`    email: ${q(m.email)}`);
  }
  if (links.length) {
    out.push("links:");
    for (const l of links) out.push(`  - label: ${q(l.label)}`, `    url: ${q(l.url)}`);
  }
  out.push(`added: ${today}`, "---", "");
  if (description) out.push(description, "");

  return {
    errors: [],
    slug,
    title,
    location,
    ignoredLicense: Boolean(location.repo && license),
    content: out.join("\n"),
  };
}

function readExisting() {
  const locations = new Map();
  const slugs = new Set();
  for (const f of readdirSync(RESOURCES_DIR)) {
    if (!f.endsWith(".md") || f.startsWith("_")) continue;
    slugs.add(f.replace(/\.md$/, ""));
    const text = readFileSync(join(RESOURCES_DIR, f), "utf8");
    for (const key of ["repo", "url"]) {
      const m = text.match(new RegExp(`^${key}:\\s*["']?([^"'\\s]+)["']?\\s*$`, "m"));
      if (m) locations.set(m[1].toLowerCase().replace(/\/+$/, ""), f);
    }
  }
  return { locations, slugs };
}

function main() {
  const [eventPath, outDir] = process.argv.slice(2);
  if (!eventPath || !outDir) {
    console.error("Usage: node scripts/issue-to-resource.mjs <event.json> <output-dir>");
    process.exit(2);
  }
  mkdirSync(outDir, { recursive: true });
  const { issue } = JSON.parse(readFileSync(eventPath, "utf8"));
  const sections = parseIssueForm(issue.body ?? "");
  const today = new Date().toISOString().slice(0, 10);
  const result = buildListing(sections, { today, existing: readExisting() });

  if (result.errors.length) {
    writeFileSync(
      join(outDir, "comment.md"),
      [
        "Thanks for the request. A few answers need a change before the listing can be generated:",
        "",
        ...result.errors.map((e) => `- ${e}`),
        "",
        "Edit this issue (the **…** menu on the first comment, then **Edit**) and the listing will be generated again automatically.",
        "",
      ].join("\n"),
    );
    writeFileSync(join(outDir, "result.json"), JSON.stringify({ ok: false }));
    console.log(`Issue #${issue.number}: ${result.errors.length} problem(s) found.`);
    return;
  }

  const path = join(RESOURCES_DIR, `${result.slug}.md`);
  if (existsSync(path)) throw new Error(`${path} already exists`);
  writeFileSync(path, result.content);

  const relationship = sections[FIELDS.relationship] ?? "";
  const author = issue.user?.login;
  const notes = [];
  if (relationship.startsWith("I'm suggesting"))
    notes.push("The requester isn't a maintainer of this resource. Confirm the maintainers agree to the listing before merging.");
  if (result.ignoredLicense)
    notes.push("The request named a license, but this is a GitHub repository, so the site reads the license from GitHub. Add a `license:` line only if GitHub's is wrong.");

  writeFileSync(join(outDir, "pr-title.txt"), `Add resource: ${result.title}`);
  writeFileSync(
    join(outDir, "pr-body.md"),
    [
      `Adds \`${path}\`, generated from #${issue.number}${author ? `, requested by @${author}` : ""}.`,
      "",
      `Closes #${issue.number}`,
      "",
      ...notes.map((n) => `> **Note:** ${n}\n`),
      "## Review",
      "",
      "- [ ] The resource is in scope for REACH.",
      "- [ ] It's publicly accessible, documented and licensed.",
      "- [ ] It has no identifiable or restricted data.",
      "- [ ] The summary reads clearly to a newcomer.",
      "",
      "Editing the issue regenerates this file and replaces any changes made in this pull request. Make wording changes here only once the requester is done editing.",
      "",
    ].join("\n"),
  );
  writeFileSync(join(outDir, "result.json"), JSON.stringify({ ok: true, path, slug: result.slug }));
  console.log(`Issue #${issue.number}: wrote ${path}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
