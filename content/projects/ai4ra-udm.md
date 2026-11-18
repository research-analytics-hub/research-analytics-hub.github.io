---
# Copy this file to add a project. Name the copy after your project in
# lowercase with hyphens, for example: award-trends.md
# The file name becomes the web address: /projects/award-trends/
# Files that start with an underscore, like this one, never appear on the site.

# Required. The project's name as readers should see it. Sentence case.
title: "AI4RA-UDM"

# Required. The GitHub repository, written as owner/name.
# The site reads the license and last update from it.
repo: "ui-insight/AI4RA-UDM"

# Required. One or two sentences: what the project does and who it helps.
summary: >-
    A standardized data model for research administration that provides universal terms and definitions, helping institutions map their local data to a common schema for dashboards and analytics.

# Required. One of: Code, Data, Code and data, Guide
kind: "Code"

# Optional. Up to six short topic labels.
topics:
  - "Research Administration"
  - "Artificial Intelligence"

# Required. At least one person readers can contact about the project.
maintainers:
  - name: "Nathan Layman"
    affiliation: "University of Idaho"
    github: "nate-layman"

# Optional. Extra links beyond the repository, such as documentation or a
# data dictionary. Use full addresses starting with https://
links:
  - label: "Read the documentation"
    url: "https://ui-insight.github.io/AI4RA-UDM/"

# Required. The date you added the project here, as YYYY-MM-DD.
added: 2026-11-12

# Optional. Set to true for the one project to highlight on the home page.
featured: false

# Optional. Set to true to keep the project off the live site while you work
# on it. Drafts still show when you preview the site on your own computer.
draft: true
---

A shared set of definitions for research administration data, so systems can exchange it and institutions can compare it.

Research administration data is scattered across institutions and proprietary systems, and each system names and defines things its own way. When two systems disagree on what counts as an active award, someone has to work out by hand which one is right.

The UDM is a specification, not a database. It defines the tables, columns, relationships, and rules that should exist. Institutions keep their current systems, map their data to the UDM, and implement it in whatever technology fits.
