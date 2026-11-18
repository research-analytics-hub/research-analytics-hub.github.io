---
# Copy this file to add a project. Name the copy after your project in
# lowercase with hyphens, for example: award-trends.md
# The file name becomes the web address: /projects/award-trends/
# Files that start with an underscore, like this one, never appear on the site.

# Required. The project's name as readers should see it. Sentence case.
title: "Vandalizer"

# Required. The GitHub repository, written as owner/name.
# The site reads the license and last update from it.
repo: "ui-insight/vandalizer"

# Required. One or two sentences: what the project does and who it helps.
summary: >-
    AI-powered document intelligence platform for research administration

# Required. One of: Code, Data, Code and data, Guide
kind: "Code"

# Optional. Up to six short topic labels.
topics:
  - "Research Administration"
  - "Artificial Intelligence"

# Required. At least one person readers can contact about the project.
maintainers:
  - name: "John Brunsfeld"
    affiliation: "University of Idaho"
    email: jbrunsfeld@uidaho.edu

# Optional. Extra links beyond the repository, such as documentation or a
# data dictionary. Use full addresses starting with https://
links:
  - label: "Visit the site"
    url: "https://vandalizer.uidaho.edu/"

# Required. The date you added the project here, as YYYY-MM-DD.
added: 2026-11-18

# Optional. Set to true for the one project to highlight on the home page.
featured: false
---

Vandalizer is an open-source, self-hosted platform for AI-powered document review and data extraction, purpose-built for research administration offices at universities. It gives offices of sponsored programs, grants offices, compliance teams, and other university units a single tool for processing the large volumes of grant proposals, award documents, and regulatory filings that flow through every funding cycle.

These offices typically review hundreds of documents per cycle to extract deadlines, budgets, compliance requirements, PI information, and sponsor-specific terms. Much of this work is manual, repetitive, and error-prone. Vandalizer automates it with configurable LLM-powered extraction workflows that pull structured data from uploaded documents, chain tasks into repeatable pipelines, and let staff ask natural-language questions against their document collections with citation-backed answers.

The project was developed at the University of Idaho under the NSF GRANTED program (Award #2427549) and is designed to be adopted by other institutions. It is fully self-hosted, runs on commodity infrastructure, and supports any OpenAI-compatible LLM provider including local models via Ollama.
