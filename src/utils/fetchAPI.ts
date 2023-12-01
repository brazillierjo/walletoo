type RequestBody = BodyInit | Record<string, unknown> | null;

export type ApiResponse<T> = {
  status: number;
  message?: string;
  data?: T;
};

async function fetchAPI<T = unknown>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body: RequestBody = null
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const jsonBody = body && typeof body === "object" ? JSON.stringify(body) : body;

  const response = await fetch(url, {
    method,
    headers,
    body: jsonBody,
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
}

export default fetchAPI;
