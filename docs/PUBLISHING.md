# Publishing Aurora UI packages to npm

Both packages are published and maintained on npm:

| npm name | Command |
|----------|---------|
| `aurora-ui-cli` | `npx aurora-ui-cli list` |
| `aurora-ui-mcp` | `npx aurora-ui-mcp` (stdio MCP server) |

## One-time setup

1. Create an npm account at https://www.npmjs.com/signup
2. Create a granular access token with **Publish** permission
3. Add it to GitHub repo secrets as `NPM_TOKEN`:
   ```bash
   gh secret set NPM_TOKEN --repo Rydaguy101/aurora-ui
   ```

## Publish via GitHub release

```bash
# Bump versions in cli/package.json and mcp/package.json
git tag v1.0.1
git push origin v1.0.1
gh release create v1.0.1 --title "v1.0.1" --generate-notes
```

The workflow `.github/workflows/publish-npm.yml` publishes both packages.

## Manual publish (local)

```bash
npm login
cd cli && npm publish --access public
cd ../mcp && npm install && npm publish --access public
```

After publishing, run `npm run generate:registry` in the repo root so live docs and `/r/*.json` install commands stay in sync.

## GitHub fallback

If npm is unavailable:

```bash
npx --yes github:Rydaguy101/aurora-ui add shimmer-button
```
