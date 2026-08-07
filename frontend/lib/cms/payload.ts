/**
 * Payload CMS client for the Colonegotiator marketing site.
 * Points at the local backend (:4001) by default.
 */

export function getPayloadApiUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_PAYLOAD_API_URL?.trim() ||
    process.env.PAYLOAD_API_URL?.trim() ||
    "http://localhost:4001"
  return url.replace(/\/+$/, "")
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
