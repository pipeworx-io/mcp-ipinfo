# mcp-ipinfo

MCP server for IP geolocation and network info via [ipinfo.io](https://ipinfo.io/). No authentication required for basic usage.

## Tools

| Tool | Description |
|------|-------------|
| `lookup_ip` | Get geolocation and network info for a specific IP address |
| `get_my_ip` | Get geolocation info for the current request IP |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "ipinfo_lookup_ip",
      "arguments": { "ip": "8.8.8.8" }
    },
    "id": 1
  }'
```

## License

MIT
