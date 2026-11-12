---
# Copy this file to add a project. Name the copy after your project in
# lowercase with hyphens, for example: award-trends.md
# The file name becomes the web address: /projects/award-trends/
# Files that start with an underscore, like this one, never appear on the site.

# Required. The project's name as readers should see it. Sentence case.
title: "Data Governance Ontology Atlas"

# Required. The GitHub repository, written as owner/name.
# The site reads the license and last update from it.
repo: "james-geiger/dgo-atlas"

# Required. One or two sentences: what the project does and who it helps.
summary: "Framework for managing and sharing data governance processes, business glossaries, and dataset registries."

# Required. One of: Code, Data, Code and data, Guide
kind: "Code"

# Optional. Up to six short topic labels.
topics:
  - "Data Governance"
  - "Ontology"

# Required. At least one person readers can contact about the project.
maintainers:
  - name: "James Geiger"
    github: "james-geiger"

# Required. The date you added the project here, as YYYY-MM-DD.
added: 2026-11-12

# Optional. Set to true for the one project to highlight on the home page.
featured: false

# Optional. Set to true to keep the project off the live site while you work
# on it. Drafts still show when you preview the site on your own computer.
draft: true
---

A business glossary gives shared definitions for the words an organization uses in its data: what counts as a "clinical trial," an "active student" or "direct costs." Keeping those definitions consistent is hard when they live in spreadsheets and wikis, where it isn't clear who owns a definition, whether it's approved, or when it last changed.

With Atlas, you keep the glossary in plain text files in a Git repository. Each term records its definition, who is responsible for it, and every step of its review. Atlas checks the files for mistakes, such as a term that refers to an owner who doesn't exist, and then builds a searchable static website you can host anywhere, including GitHub Pages.

Atlas is built on the Data Governance Ontology (DGO) shared standard.  DGO is a published vocabulary that defines the parts of data governance, such as terms, owners, stewards, councils and approval steps, and how they relate to each other. You write in everyday words like 'owner' or 'approved', and Atlas translates them into DGO's standard definitions. That means other tools can read and reuse your glossary without guessing what the fields mean.
