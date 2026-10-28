import fs from "node:fs";
import path from "node:path";

/** True when a file exists inside the project's `public` directory. */
export function publicFileExists(publicPath: string): boolean {
  if (!publicPath) return false;
  const relative = publicPath.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", relative));
}
