// Content model for the site. Everything editors touch lives in the top-level
// `content/` folder; this file describes what each file must contain. When a
// file breaks these rules, the build (and the pull request check) fails with a
// message naming the file and the field.
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// A full web address, for links that leave this site.
const link = z.object({
  label: z.string().min(1),
  url: z.url(),
});

// A path on this site (/about/) or a full web address.
const href = z
  .string()
  .refine(
    (s) => s.startsWith("/") || URL.canParse(s),
    "Use a path on this site like /about/ or a full address starting with https://",
  );
const siteLink = z.object({ label: z.string().min(1), url: href });

const projects = defineCollection({
  // Files whose names start with an underscore (like _template.md) are skipped.
  loader: glob({ pattern: "[^_]*.md", base: "./content/projects" }),
  schema: () =>
    z.object({
      title: z.string().min(1).max(90),
      repo: z
        .string()
        .regex(
          /^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/,
          'Use the form "owner/repository", for example "research-analytics-hub/award-trends".',
        ),
      summary: z
        .string()
        .min(20)
        .max(280, "Keep the summary to one or two sentences (280 characters at most)."),
      kind: z.enum(["Code", "Data", "Code and data", "Guide"]),
      topics: z.array(z.string().min(1)).max(6).default([]),
      maintainers: z
        .array(
          z.object({
            name: z.string().min(1),
            affiliation: z.string().optional(),
            github: z.string().optional(),
          }),
        )
        .min(1, "List at least one maintainer so readers know who to ask."),
      links: z.array(link).default([]),
      added: z.coerce.date(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "[^_]*.md", base: "./content/pages" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    eyebrow: z.string().optional(),
  }),
});

const callouts = defineCollection({
  loader: glob({ pattern: "[^_]*.md", base: "./content/callouts" }),
  schema: z
    .object({
      label: z.string().min(1).max(24),
      title: z.string().min(1),
      link_text: z.string().min(1),
      link_url: z.url(),
      show_from: z.coerce.date(),
      show_until: z.coerce.date(),
    })
    .refine((c) => c.show_until >= c.show_from, {
      message: "show_until must be on or after show_from.",
      path: ["show_until"],
    }),
});

const settings = defineCollection({
  loader: file("./content/settings.yaml"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    github_org: z.string(),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      primary_action: siteLink,
      secondary_action: siteLink,
    }),
    navigation: z.array(siteLink),
    footer: z.object({
      about: z.string(),
      columns: z.array(z.object({ title: z.string(), links: z.array(siteLink) })).max(3),
      fine_print: z.string(),
    }),
  }),
});

export const collections = { projects, pages, callouts, settings };
