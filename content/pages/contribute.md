---
title: "Add your project"
description: "How to list your code or data on REACH code and data, using nothing more than a GitHub account."
eyebrow: "Contribute"
---

If you've published code, data or a guide that would save another research analytics
team some time, we'd like to list it. You keep the repository; this site links to it
and shows a short summary. Adding a listing takes about fifteen minutes.

## Before you start

Your project needs a public GitHub repository with a README that explains what it
does and how to use it. It also needs a license, so others know what they're allowed
to do with it. If you're unsure which to choose,
[choosealicense.com](https://choosealicense.com/) is a good place to start; MIT is
common for code and CC BY 4.0 for data.

Please don't list anything that contains identifiable information about people or
data your institution restricts. Public data and synthetic data are both fine.

## Prefer a form?

If you'd rather not edit a file, fill in a
[resource request](https://github.com/research-analytics-hub/research-analytics-hub.github.io/issues/new?template=resource-request.yml)
on GitHub instead. A REACH maintainer writes the listing from your answers and follows
up on the request if anything is unclear. You'll need a free
[GitHub account](https://github.com/signup) for either route.

## Add a listing yourself

1. Open the
   [project template](https://github.com/research-analytics-hub/research-analytics-hub.github.io/blob/main/content/projects/_template.md)
   and copy everything in it.
2. Go to the
   [projects folder](https://github.com/research-analytics-hub/research-analytics-hub.github.io/tree/main/content/projects),
   choose **Add file**, then **Create new file**. GitHub will offer to make your own
   copy of the site (a "fork") the first time; accept it.
3. Name the file after your project in lowercase with hyphens, ending in `.md`, for
   example `award-trends.md`. Paste the template and replace the example values with
   your own. Delete the line `draft: true` near the bottom, or change it to
   `draft: false`.
4. Choose **Commit changes**, then **Propose changes**, then **Create pull request**.

That's it on your end. An automatic check runs on your pull request within a couple of
minutes. If a field is missing or in the wrong format, the check fails and its log
names the file and the field to fix; you can edit the file again from the pull request
page. Once the check passes, a REACH maintainer reviews the listing, may suggest small
wording changes, and merges it. The site updates a few minutes after that.

## Keeping a listing current

The repository description, language, license and last-updated date come straight from
GitHub each time the site rebuilds, which happens at least once a day. You only need
to edit your listing file when something in it changes, such as a new maintainer. To remove a
listing, open a pull request that deletes the file, or
[open an issue](https://github.com/research-analytics-hub/research-analytics-hub.github.io/issues/new)
and we'll take it down.

The repository's
[contributing guide](https://github.com/research-analytics-hub/research-analytics-hub.github.io/blob/main/CONTRIBUTING.md)
covers all of this in more detail, including what reviewers check.
