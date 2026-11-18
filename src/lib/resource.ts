// One view of where a listing lives, whether it's a GitHub repository (`repo:`)
// or a resource hosted anywhere else (`url:`). Pages and cards read this
// instead of checking which kind of listing they have.
import type { Project } from "./content";
import { getRepo } from "./github";

export interface Resource {
  /** Where the main button and the Source row link to. */
  href: string;
  /** Text for the main button. */
  buttonLabel: string;
  /** Short text for the Source row: owner/name for GitHub, host and path otherwise. */
  sourceText: string;
  /** True when sourceText is a GitHub owner/name, shown as code. */
  isGitHub: boolean;
  /** The license to show, or null when none is known. */
  license: string | null;
  licenseUrl: string | null;
  /** Fallback text for the License row when `license` is null. */
  licenseFallback: string;
  /** Last update, known only for GitHub repositories. */
  updatedAt: Date | null;
  archived: boolean;
}

export async function getResource({ data }: Project): Promise<Resource> {
  const licenseUrl = data.license_url ?? null;

  if (data.repo) {
    const repo = await getRepo(data.repo);
    return {
      href: repo?.url ?? `https://github.com/${data.repo}`,
      buttonLabel: data.button_label ?? "View the repository",
      sourceText: data.repo,
      isGitHub: true,
      license: data.license ?? repo?.license ?? null,
      licenseUrl,
      licenseFallback: repo ? "None detected; check the repository" : "See the repository",
      updatedAt: repo?.pushedAt ?? null,
      archived: data.archived || Boolean(repo?.archived),
    };
  }

  // The schema guarantees `url` and `license` when `repo` is absent.
  const url = new URL(data.url!);
  return {
    href: url.href,
    buttonLabel: data.button_label ?? "View the resource",
    sourceText: displayUrl(url),
    isGitHub: false,
    license: data.license ?? null,
    licenseUrl,
    licenseFallback: "See the resource",
    updatedAt: null,
    archived: data.archived,
  };
}

/** zenodo.org/records/1234567, without the scheme, "www." or a trailing slash. */
function displayUrl(url: URL) {
  const host = url.hostname.replace(/^www\./, "");
  const path = url.pathname.replace(/\/$/, "");
  return host + path;
}
