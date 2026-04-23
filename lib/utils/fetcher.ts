export async function fetchJson<T>(
  input: string | URL,
  init?: RequestInit & { next?: NextFetchRequestConfig }
) {
  const response = await fetch(input, init);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed: ${response.status} ${response.statusText} - ${body}`);
  }

  return (await response.json()) as T;
}
