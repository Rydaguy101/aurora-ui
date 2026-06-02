# Aurora UI MCP Server

Model Context Protocol server for [Aurora UI](https://github.com/Rydaguy101/aurora-ui).

## Install (Cursor / Claude Desktop)

Add to your MCP config:

```json
{
  "mcpServers": {
    "aurora-ui": {
      "command": "npx",
      "args": ["-y", "aurora-ui-mcp"]
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all components, optional `category` filter |
| `search_components` | Search by keyword |
| `get_component` | Metadata for one slug |
| `get_component_source` | Full TypeScript source |
| `get_integration_guide` | Agent integration docs |

## Environment

| Variable | Default |
|----------|---------|
| `AURORA_UI_REGISTRY` | GitHub raw `registry.json` |
| `AURORA_UI_SITE` | `https://aurora-ui-tau.vercel.app` |
| `AURORA_UI_DOCS` | GitHub raw `FOR_AI.md` |
