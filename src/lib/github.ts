// Reads live details for a listed repository from the GitHub API at build time.
//
// In CI (pull request checks and deploys) a repository that doesn't exist or
// isn't public fails the build, so a typo in `repo:` is caught before merge.
// Any other problem (rate limits, no network on a laptop) only logs a warning
// and the page renders without the live details.

export interface RepoInfo {
  url: string;
  description: string | null;
  license: string | null;
  pushedAt: Date;
  archived: boolean;
  homepage: string | null;
}

const cache = new Map<string, Promise<RepoInfo | null>>();

export function getRepo(repo: string): Promise<RepoInfo | null> {
  if (!cache.has(repo)) cache.set(repo, fetchRepo(repo));
  return cache.get(repo)!;
}

async function fetchRepo(repo: string): Promise<RepoInfo | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "reach-code-and-data-site",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  } catch (err) {
    console.warn(`[github] Could not reach GitHub for ${repo}: ${(err as Error).message}`);
    return null;
  }

  if (res.status === 404) {
    const message =
      `[github] The repository "${repo}" was not found. Check the repo: line in its ` +
      `content/projects file, and make sure the repository is public.`;
    if (process.env.CI) throw new Error(message);
    console.warn(message);
    return null;
  }
  if (!res.ok) {
    console.warn(`[github] GitHub returned ${res.status} for ${repo}; building without live details.`);
    return null;
  }

  const data = await res.json();
  if (data.private) {
    const message = `[github] The repository "${repo}" is private. Only public repositories can be listed.`;
    if (process.env.CI) throw new Error(message);
    console.warn(message);
    return null;
  }

  return {
    url: data.html_url,
    description: data.description,
    license: data.license && data.license.spdx_id !== "NOASSERTION" ? data.license.spdx_id : null,
    pushedAt: new Date(data.pushed_at),
    archived: Boolean(data.archived),
    homepage: data.homepage || null,
  };
}
