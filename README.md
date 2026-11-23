# John Paul Gonzaga

A single-page portfolio for web development, design, and video work. Built with React, TypeScript, and Vite.

## Run locally

```sh
npm ci
npm run dev
npm run build
```

Vite serves the development site at http://localhost:5173/ and writes the production build to `dist/`.

## Update the portfolio

| Content | File |
| --- | --- |
| Name, portrait, email, and social links | `src/data/profile.ts` |
| Project cards, technologies, and links | `src/data/portfolio-projects.ts` |
| Tool logos and categories | `src/components/ToolLogos.tsx` |
| Theme colors | `src/styles/tokens.css` |
| Page title and sharing metadata | `index.html` |
| Open Graph preview and favicon | `public/opengraph.jpg`, `public/favicon.svg` |

## GitHub contributions

The chart starts with the checked-in data in `src/data/github-contributions.json`. The **Refresh GitHub contributions** Actions workflow updates it daily and can also be run manually. It reads the public profile calendar and uses the optional `CONTRIBUTIONS_TOKEN` Actions secret to compare the counts with GitHub's GraphQL API. The token stays in Actions.

To refresh the snapshot locally, run `node scripts/update-github-contributions.mjs`.

## License

MIT. See [LICENSE](LICENSE). Tool logos belong to their respective owners.
