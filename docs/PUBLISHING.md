# Publishing Aurora UI packages to npm

The CLI and MCP packages publish via GitHub Actions when you create a release.

## One-time setup

1. Create an npm account at https://www.npmjs.com/signup
2. Create a granular access token with **Publish** permission
3. Add it to GitHub repo secrets as `NPM_TOKEN`:
   ```bash
   gh secret set NPM_TOKEN --repo Rydaguy101/aurora-ui
   ```

## Publish

```bash
# Bump versions in cli/package.json and mcp/package.json if needed
git tag v1.0.0
git push origin v1.0.0
gh release create v1.0.0 --title "v1.0.0" --generate-notes
```

The workflow `.github/workflows/publish-npm.yml` publishes both packages.

## Manual publish (local)

```bash
npm login
cd cli && npm publish --access public
cd ../mcp && npm install && npm publish --access public
```

## Packages

| npm name | Command |
|----------|---------|
| `aurora-ui-cli` | `npx aurora-ui-cli list` |
| `aurora-ui-mcp` | `npx aurora-ui-mcp` (stdio MCP server) |

Until published, use GitHub fallback:

```bash
npx --yes github:Rydaguy101/aurora-ui/cli/bin/aurora-ui.mjs list
node mcp/src/index.js  # from cloned repo
```
