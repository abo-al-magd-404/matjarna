import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://photography-lane-lap-nothing.trycloudflare.com/api";

/**
 * API Proxy Route
 * Forwards all requests to the backend to avoid CORS issues
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const params = await context.params;
  return proxyRequest(request, params);
}

async function proxyRequest(request: NextRequest, params: { path: string[] }) {
  try {
    console.log("🔶 Proxy: Received request", {
      method: request.method,
      path: params.path,
      url: request.url,
    });

    // Reconstruct the path
    const path = params.path.join("/");

    // Get search params
    const searchParams = request.nextUrl.searchParams.toString();
    const queryString = searchParams ? `?${searchParams}` : "";

    // Build the target URL
    const targetUrl = `${BACKEND_URL}/${path}${queryString}`;
    console.log("🔶 Proxy: Forwarding to:", targetUrl);

    // Get the request body if it exists
    let body = null;
    if (request.method !== "GET" && request.method !== "HEAD") {
      try {
        body = await request.text();
        console.log("🔶 Proxy: Request body:", body);
      } catch (e) {
        console.error("🔶 Proxy: Failed to read request body:", e);
      }
    }

    // Forward headers (excluding host and other problematic headers)
    const headers: HeadersInit = {};
    request.headers.forEach((value, key) => {
      if (
        !["host", "connection", "content-length"].includes(key.toLowerCase())
      ) {
        headers[key] = value;
      }
    });

    console.log("🔶 Proxy: Making backend request...");
    // Make the request to the backend
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: body || undefined,
    });

    console.log("🔶 Proxy: Backend response status:", response.status);

    // Get response body
    const responseBody = await response.text();
    console.log("🔶 Proxy: Backend response body:", responseBody);

    // Forward the response
    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("🔶 Proxy error:", error);
    return NextResponse.json(
      {
        error: "Proxy request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
