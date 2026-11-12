import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

export async function getSettings() {
  const entry = await getEntry("settings", "site");
  if (!entry) throw new Error('content/settings.yaml must have a top-level "site:" section.');
  return entry.data;
}

/** Published projects, newest first. Drafts are included only in local previews. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection("projects", (p) => import.meta.env.DEV || !p.data.draft);
  return all.sort(
    (a, b) => b.data.added.getTime() - a.data.added.getTime() || a.data.title.localeCompare(b.data.title),
  );
}

/** Callouts whose show_from/show_until window includes the build date. */
export async function getActiveCallouts(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  const all = await getCollection("callouts", (c) => {
    const from = c.data.show_from.toISOString().slice(0, 10);
    const until = c.data.show_until.toISOString().slice(0, 10);
    return from <= today && today <= until;
  });
  return all.sort((a, b) => a.data.show_until.getTime() - b.data.show_until.getTime());
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(d: Date) {
  return dateFormat.format(d);
}

export function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}
