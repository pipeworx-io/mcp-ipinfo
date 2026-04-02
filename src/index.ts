/**
 * IPInfo MCP — wraps ipinfo.io (free tier, no auth required for basic usage)
 *
 * Tools:
 * - lookup_ip: Get geolocation and network info for a specific IP address
 * - get_my_ip: Get geolocation info for the current request's IP address
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://ipinfo.io';

interface IpInfoResponse {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
  error?: { status: string; message: string };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'lookup_ip',
    description:
      'Get geolocation and network information for a specific IP address. Returns city, region, country, coordinates, org, postal code, and timezone.',
    inputSchema: {
      type: 'object',
      properties: {
        ip: {
          type: 'string',
          description: 'IPv4 or IPv6 address to look up (e.g., "8.8.8.8")',
        },
      },
      required: ['ip'],
    },
  },
  {
    name: 'get_my_ip',
    description:
      "Get geolocation and network information for the current request's originating IP address.",
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'lookup_ip':
      return lookupIp(args.ip as string);
    case 'get_my_ip':
      return getMyIp();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function formatResponse(data: IpInfoResponse) {
  if (data.error) {
    throw new Error(`ipinfo.io error: ${data.error.message}`);
  }
  const [latitude, longitude] = (data.loc ?? '').split(',').map(Number);
  return {
    ip: data.ip,
    city: data.city ?? null,
    region: data.region ?? null,
    country: data.country ?? null,
    latitude: isNaN(latitude!) ? null : latitude,
    longitude: isNaN(longitude!) ? null : longitude,
    org: data.org ?? null,
    postal: data.postal ?? null,
    timezone: data.timezone ?? null,
  };
}

async function lookupIp(ip: string) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(ip)}/json`);
  if (!res.ok) throw new Error(`ipinfo.io error: ${res.status}`);
  const data = (await res.json()) as IpInfoResponse;
  return formatResponse(data);
}

async function getMyIp() {
  const res = await fetch(`${BASE_URL}/json`);
  if (!res.ok) throw new Error(`ipinfo.io error: ${res.status}`);
  const data = (await res.json()) as IpInfoResponse;
  return formatResponse(data);
}

export default { tools, callTool } satisfies McpToolExport;
