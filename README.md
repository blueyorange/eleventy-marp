# Eleventy Marp

Generates full slide presentations using [Marp](https://marp.app/) and [Eleventy](https://www.11ty.dev/).

## Why?

Marp produces fantastic looking presentations from markdown. Eleventy adds the power of chained layouts and collections.

## How?

Clone this repo, and start adding your own markdown presentations. If marp: true is included in the frontmatter and layout is set to presentation, it will generate a marp presentation. The code is the same as for Marp CLI, so the full Bespoke template is used to allow for slide transitions. No other marp frontmatter is supported - use directives instead to set the theme etc.

## Themes

These are stored in the themes/ folder. These will be added to marp upon restarting the server.
