# Contributing to REACH code and data

Thanks for helping build the index. This site lists code, data and guides that people
in the REACH community have published openly. Each resource stays in its own GitHub
repository, owned by the people who maintain it; the site links to it and shows a
short summary.

There are two ways to add a resource:

- **[Open a resource request](https://github.com/research-analytics-hub/research-analytics-hub.github.io/issues/new?template=resource-request.yml)**
  if you'd rather fill in a form. A REACH maintainer turns it into a listing for you.
- **Open a pull request** with the listing file yourself if you're comfortable editing
  a text file on GitHub. It's usually the quicker route, and the steps are below.

Either way you'll need a free [GitHub account](https://github.com/signup).

## What can be listed

A resource can be listed when its repository:

- is **public** on GitHub,
- has a **README** that explains what it does and how to use it,
- has a **license**, so others know what they may do with it
  ([choosealicense.com](https://choosealicense.com/) helps; MIT is common for code
  and CC BY 4.0 for data), and
- contains **no identifiable information about people** and no data your institution
  restricts. Public and synthetic data are both fine.

You don't have to be the maintainer to suggest a resource, but we'll check with the
maintainers before listing someone else's work.

## Option 1: Open a resource request

1. Open the
   [resource request form](https://github.com/research-analytics-hub/research-analytics-hub.github.io/issues/new?template=resource-request.yml).
2. Fill in the fields. Only the repository link, name, summary, type and maintainer are
   required; the rest helps us write a better listing.
3. Choose **Create**.

A maintainer will follow up on the issue if anything is unclear, then open the pull
request that adds the listing. The issue closes automatically when the listing goes
live.

## Option 2: Open a pull request

This happens entirely in your web browser and takes about fifteen minutes.

1. Open the
   [listing template](content/projects/_template.md) and copy everything in it. The
   comments in the template explain each field.
2. Go to the [projects folder](content/projects/), choose **Add file**, then
   **Create new file**. If you don't have write access to this repository, GitHub
   will offer to make your own copy (a "fork") first; accept it.
3. Name the file after the resource in lowercase with hyphens, ending in `.md`, for
   example `award-trends.md`. The file name becomes the web address:
   `/projects/award-trends/`.
4. Paste the template and replace the example values with your own. Delete the line
   `draft: true` near the bottom, or change it to `draft: false`.
5. Choose **Commit changes**, then **Propose changes**, then **Create pull request**,
   and tick the checklist in the pull request description.

### After you open the pull request

An automatic check called **Build site** runs within a couple of minutes. It confirms
that every required field is present and in the right format, and that the repository
exists and is public.

If the check fails, choose **Details** next to it and look for a message near the end
that names the file and the field, for example:

```
projects → award-trends data does not match collection schema.
  kind: Invalid option: expected one of "Code"|"Data"|"Code and data"|"Guide"
```

Fix the file from the pull request's **Files changed** tab (the pencil icon on the
file), commit, and the check runs again.

Once the check passes, a REACH maintainer reviews the listing. They may suggest small
wording changes. After it's merged, the site updates within a few minutes.

## Updating or removing a listing

The repository's license and last-updated date come from GitHub every time
the site rebuilds, which happens at least once a day, so those stay current on their
own. Edit your listing file when something in it changes, such as a new maintainer or
a better summary.

To remove a listing, open a pull request that deletes its file, or
[open an issue](https://github.com/research-analytics-hub/research-analytics-hub.github.io/issues/new)
and say which one.

## Other changes to the site

Wording fixes and new pages are welcome too. All of the site's text lives in the
[`content/`](content/) folder; the [README](README.md) explains which file holds what.
For anything larger, open an issue first so we can talk it through.

## For maintainers

### Reviewing a listing pull request

GitHub asks the Resource Reviewers team for a review automatically on any pull
request that changes `content/projects/` (set in `.github/CODEOWNERS`).

- The **Build site** check must pass. It has already confirmed the fields and that
  the repository is public.
- Open the repository and confirm it has a README and a license, and skim it for
  anything that looks like personal or restricted data.
- If the person opening the pull request isn't one of the listed maintainers, confirm
  the maintainers agree before merging.
- Read the summary as a newcomer would. One or two plain sentences: what the resource
  does and who it helps.

### Turning a resource request into a listing

1. Create `content/projects/<name>.md` from the template using the answers in the
   issue, with `added:` set to today's date.
2. Open a pull request and put `Closes #<issue number>` in its description, so the
   issue closes when the listing is merged.
3. Mention the requester on the pull request so they can check the wording.

### Labels

The request form applies the `resource request` label. Create that label once under
**Issues → Labels** if it doesn't exist yet; GitHub skips labels it can't find.
