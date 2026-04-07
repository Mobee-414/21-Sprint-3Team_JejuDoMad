import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface CustomRequestInit extends RequestInit {
  duplex?: "half" | "full" | string;
}

export const fetchWithAccessToken = async (
  req: NextRequest,
  params: { path: string[] },
) => {
  const cookieStore = await cookies();
  const headers = new Headers(req.headers);
  const accessToken = cookieStore.get("accessToken")?.value;

  const pathname = `/${params.path.join("/")}`;
  const search = req.nextUrl.search;
  const targetPath = pathname + search;

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let body: BodyInit | null = null;

  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  const fetchOptions: CustomRequestInit = {
    method: req.method,
    headers,
    body,
    duplex: body ? "half" : undefined,
    cache: "no-store",
  };
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${targetPath}`,
    fetchOptions,
  );
};
