---
# Copy this file to add a project. Name the copy after your project in
# lowercase with hyphens, for example: award-trends.md
# The file name becomes the web address: /projects/award-trends/
# Files that start with an underscore, like this one, never appear on the site.

# Required. The project's name as readers should see it. Sentence case.
title: "Award trends by sponsor"

# Required: where the resource lives. Give ONE of repo or url.
#
# repo: a public GitHub repository, written as owner/name. The site reads
# its license and last update from GitHub.
repo: "your-org/your-repository"
#
# url: anything not on GitHub, such as a Zenodo record, a Dataverse dataset,
# an OSF project or a GitLab repository. Use the full address starting with
# https://. Delete the repo line above if you use this one.
# url: "https://zenodo.org/records/1234567"

# Required with url; optional with repo, where it replaces the license GitHub
# detects. The license's name, for example "MIT" or "CC BY 4.0".
# license: "CC BY 4.0"

# Optional. A link to the license text.
# license_url: "https://creativecommons.org/licenses/by/4.0/"

# Optional. Text for the main button. Defaults to "View the repository"
# with repo and "View the resource" with url.
# button_label: "Open the dataset"

# Required. One or two sentences: what the project does and who it helps.
summary: "Scripts that turn a sponsored-awards export into year-over-year trend tables by sponsor and college."

# Required. One of: Code, Data, Code and data, Guide
kind: "Code"

# Optional. Up to six short topic labels.
topics:
  - "Sponsored research"
  - "R"

# Required. At least one person readers can contact about the project.
# github and email are optional. The name links to the GitHub profile if
# given, otherwise to the email address, otherwise it appears as plain text.
maintainers:
  - name: "Your Name"
    affiliation: "Your Institution"
    github: "your-github-username"
    email: "you@your-institution.edu"

# Optional. Extra links beyond the main one, such as documentation or a
# data dictionary. Use full addresses starting with https://
links:
  - label: "Read the documentation"
    url: "https://example.org/docs"

# Required. The date you added the project here, as YYYY-MM-DD.
added: 2026-11-12

# Optional. Set to true for the one project to highlight on the home page.
featured: false

# Optional. Set to true when the resource is retired: still useful as a
# reference but no longer updated. GitHub repositories archived on GitHub
# are marked automatically.
archived: false

# Optional. Set to true to keep the project off the live site while you work
# on it. Drafts still show when you preview the site on your own computer.
draft: true
---

Anything below the dashes is the longer description on the project's own page.
Write it in plain text; Markdown formatting such as **bold**, lists and links
works too.

Good things to cover: the question the project answers, what data it expects
and in what shape, how to run it, and how to cite it.
