# mcp-ipinfo

IPInfo MCP — wraps ipinfo.io (free tier, no auth required for basic usage)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `lookup_ip` | Get geolocation and network info for any IP address (e.g., "8.8.8.8"). Returns city, region, country, coordinates, org, postal code, timezone. |
| `get_my_ip` | Get your current IP address with geolocation data. Returns city, region, country, coordinates, org, postal code, timezone. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "ipinfo": {
      "url": "https://gateway.pipeworx.io/ipinfo/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Ipinfo data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
