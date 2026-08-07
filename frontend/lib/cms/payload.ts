/**
 * Payload CMS client for the Colonegotiator marketing site.
 *
 * Resolution order:
 * 1. PAYLOAD_API_URL — Vercel service binding (server-side, preferred in prod)
 * 2. NEXT_PUBLIC_PAYLOAD_API_URL — explicit public/base URL (local or override)
 * 3. Same-origin empty → http://localhost:4001 for local `pnpm dev`
 */

export function getPayloadApiUrl(): string {
  const fromBinding = process.env.PAYLOAD_API_URL?.trim()
  if (fromBinding) return fromBinding.replace(/\/+$/, "")

  const fromPublic = process.env.NEXT_PUBLIC_PAYLOAD_API_URL?.trim()
  if (fromPublic) return fromPublic.replace(/\/+$/, "")

  // On Vercel the public site and CMS share one domain; /api is rewritten to backend.
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, "")
  }

  return "http://localhost:4001"
}

export type FetchPayloadOptions = RequestInit & {
  throwOnHttpError?: boolean
  revalidate?: number | false
}

export type FetchPayloadResult = {
  status: number
  data: unknown
  ok: boolean
}

export async function fetchPayloadAPI(
  path: string,
  searchParams: Record<string, string | number | boolean | undefined> = {},
  options: FetchPayloadOptions = {},
): Promise<FetchPayloadResult> {
  const throwOnHttpError = options.throwOnHttpError !== false
  const {
    throwOnHttpError: _t,
    revalidate = 60,
    ...fetchInit
  } = options

  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const url = new URL(`${getPayloadApiUrl()}/api${normalizedPath}`)

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue
    url.searchParams.set(key, String(value))
  }

  const nextOptions =
    revalidate === false || revalidate === 0
      ? { cache: "no-store" as const }
      : { next: { revalidate: typeof revalidate === "number" ? revalidate : 60 } }

  try {
    const response = await fetch(url.toString(), {
      ...fetchInit,
      ...nextOptions,
      headers: {
        "Content-Type": "application/json",
        ...(fetchInit.headers || {}),
      },
    })

    const data = await response.json().catch(() => null)
    const result = { status: response.status, data, ok: response.ok }

    if (!response.ok && throwOnHttpError) {
      throw new Error(
        `Payload API error ${response.status} for ${url.pathname}`,
      )
    }

    return result
  } catch (error) {
    if (throwOnHttpError) throw error
    return { status: 500, data: null, ok: false }
  }
}
