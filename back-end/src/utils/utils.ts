export function extractTokenFromHeader(headers: {
  [key: string]: string | string[] | undefined;
}): string | null {
  const authHeader = headers["authorization"] || headers["Authorization"];
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
}
