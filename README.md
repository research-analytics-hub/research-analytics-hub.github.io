# REACH code and data

Source for <https://research-analytics-hub.github.io>, the public index of code and
data published by the REACH (Research Evaluation & Analytics Capacity Hub) community.

The site is built with [Astro](https://astro.build) and published to GitHub Pages by
GitHub Actions. All of the words on it live in plain text files in the `content/`
folder, so most changes never touch code.

## Where to edit what

| To change… | Edit |
| --- | --- |
| A project listing | `content/projects/<project>.md` |
| Add a project | Copy `content/projects/_template.md` to a new file (see [How to contribute](https://research-analytics-hub.github.io/contribute/)) |
| The About or Contribute page | `content/pages/about.md`, `content/pages/contribute.md` |
| Add a page | A new `.md` file in `content/pages/`; `history.md` becomes `/history/`. Add it to the menu in `content/settings.yaml` |
| Home page headline, menu, footer | `content/settings.yaml` |
| A dated announcement (the Summit, a call for proposals) | A file in `content/callouts/`; copy `summit-2027.md` and change the dates |

You can make any of these changes on github.com: open the file, choose the pencil
icon, edit, and commit. If you don't have write access, GitHub will turn your edit
into a pull request automatically.

### Announcements

Each file in `content/callouts/` has a `show_from` and a `show_until` date. The home
page shows the active announcement whose `show_until` comes soonest, and the site
rebuilds every day, so an announcement appears and disappears on schedule without
anyone remembering to edit it. Adding next year's Summit is a matter of copying last
year's file and changing the details.

### Drafts

A project with `draft: true` shows up when you preview the site on your own computer
and is left out of the live site.

## How publishing works

The workflow in `.github/workflows/site.yml` runs:

- **On every pull request**: builds the site. The build checks every content file
  against the rules in `src/content.config.ts` and confirms that each listed
  repository exists and is public. A failing check names the file and the field.
- **On every push to `main`**: builds and deploys to GitHub Pages.
- **Daily**: rebuilds so repository details (language, license, last update) stay
  current and expired announcements drop off.

The built site is uploaded as a Pages artifact; there is no `gh-pages` branch.

### One-time repository setup

1. **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.
2. **Settings → Branches**: add a rule for `main` that requires pull requests and the
   **Build site** status check, so nothing reaches the live site without passing.

## Working on the site locally

You need Node.js 24 (see `.nvmrc`; Astro 7 requires at least 22.23.4).

```bash
npm install
npm run dev       # preview at http://localhost:4321, drafts included
npm run build     # production build into dist/
npm run preview   # serve dist/ at http://localhost:4321, drafts excluded
```

Open the built site through `npm run preview`, not by double-clicking
`dist/index.html`. Links like `/projects/` point at the site root, which only
works when a web server is serving `dist/`.

Without a `GITHUB_TOKEN` in your environment the GitHub API allows 60 requests an
hour, which is plenty for local work. If it runs out, pages still build without the
live repository details.

## Design

Colors, type and components come from the REACH design system:
`src/styles/tokens.css` is generated from its tokens and `src/styles/reach.css` is its
component stylesheet. Change them in the design system first and copy them here, so
the two don't drift. Site-specific layout lives in `src/styles/site.css`.

## Layout

```
content/            everything editors change
  projects/         one Markdown file per listed project
  pages/            standalone pages (About, Contribute)
  callouts/         dated announcements for the home page
  settings.yaml     headline, menu, footer
public/img/         logos
src/
  content.config.ts the rules each content file must follow
  lib/github.ts     reads live repository details at build time
  pages/            page templates
  components/       header, footer, cards
  styles/           REACH tokens and components, site layout
```
