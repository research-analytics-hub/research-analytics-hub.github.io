# Contributing to REACH code and data

Thanks for helping build the index. This site lists code, data and guides that people
in the REACH community have published openly. Each resource stays where its
maintainers publish it, usually a GitHub repository but sometimes Zenodo, Dataverse,
OSF, GitLab or similar; the site links to it and shows a short summary.

There are two ways to add a resource:

- **[Open a resource request](https://github.com/research-analytics-hub/research-analytics-hub.github.io/issues/new?template=resource-request.yml)**
  if you'd rather fill in a form. A REACH maintainer turns it into a listing for you.
- **Open a pull request** with the listing file yourself if you're comfortable editing
  a text file on GitHub. It's usually the quicker route, and the steps are below.

Either way you'll need a free [GitHub account](https://github.com/signup), even if
the resource itself isn't on GitHub.

## What can be listed

A resource can be listed when it:

- is **public**: a public GitHub repository, or a page anyone can open without
  signing in,
- has **documentation**, such as a README, that explains what it does and how to use
  it,
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
2. Fill in the fields. Only the link, name, summary, type and maintainer are
   required, plus the license if the resource isn't on GitHub; the rest helps us write
   a better listing.
3. Choose **Create**.

A reviewer will follow up on the issue if anything is unclear. Once they approve it,
a pull request with your listing is opened automatically from your answers and linked
on the issue. The issue closes when the listing goes live.

## Option 2: Open a pull request

This happens entirely in your web browser and takes about fifteen minutes.

1. Open the
   [listing template](content/resources/_template.md) and copy everything in it. The
   comments in the template explain each field.
2. Go to the [projects folder](content/resources/), choose **Add file**, then
   **Create new file**. If you don't have write access to this repository, GitHub
   will offer to make your own copy (a "fork") first; accept it.
3. Name the file after the resource in lowercase with hyphens, ending in `.md`, for
   example `award-trends.md`. The file name becomes the web address:
   `/resources/award-trends/`.
4. Paste the template and replace the example values with your own. Delete the line
   `draft: true` near the bottom, or change it to `draft: false`.
5. Choose **Commit changes**, then **Propose changes**, then **Create pull request**,
   and tick the checklist in the pull request description.

### After you open the pull request

An automatic check called **Build site** runs within a couple of minutes. It confirms
that every required field is present and in the right format. For a GitHub
repository, it also confirms the repository exists and is public.

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

For a GitHub repository, the license and last-updated date come from GitHub every
time the site rebuilds, which happens at least once a day, so those stay current on
their own. For a resource elsewhere, the listing shows the license from your file and
no last-updated date. Edit your listing file when something in it changes, such as a
new maintainer, a better summary, a new license, or the resource being retired (set
`archived: true`).

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
request that changes `content/resources/` (set in `.github/CODEOWNERS`).

- The **Build site** check must pass. It has already confirmed the fields and, for a
  GitHub repository, that the repository is public.
- Open the resource and confirm it has documentation and a license, and skim it for
  anything that looks like personal or restricted data.
- For a resource outside GitHub (`url:`), open the link in a private browser window
  to confirm it loads without signing in, and check that the `license:` line matches
  what the resource itself states.
- If the person opening the pull request isn't one of the listed maintainers, confirm
  the maintainers agree before merging.
- Read the summary as a newcomer would. One or two plain sentences: what the resource
  does and who it helps.

### Turning a resource request into a listing

1. Read the request. If it's in scope, add the **`approved`** label.
2. Within a minute or two, the resource request workflow writes
   `content/resources/<name>.md` from the answers (`repo:` for a GitHub repository,
   `url:` and `license:` for anything else) and opens a pull request with
   `Closes #<issue number>`, so the two are linked. It comments the link on the
   issue, removes `triage needed`, and starts the **Build site** check.
3. Review that pull request like any other listing.

If an answer can't be used (a summary that's too long, a link it can't read, a
resource that's already listed), the workflow comments on the issue instead and
explains what to change. When the requester edits the issue, the listing is
generated again and the open pull request updates. That also replaces any edits made
directly in the pull request, so make wording changes there only once the requester
is done.

To do it by hand instead, create the file from the template, open a pull request with
`Closes #<issue number>` in its description, and mention the requester.

### Labels

- `new resource` and `triage needed`: applied by the request form.
- `approved`: added by a reviewer to generate the pull request.

Create them once under **Issues → Labels** if they don't exist yet; GitHub skips
labels it can't find.
