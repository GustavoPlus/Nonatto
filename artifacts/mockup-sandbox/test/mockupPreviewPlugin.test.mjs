import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { mockupPreviewPlugin } from "../mockupPreviewPlugin.ts";

test("mockup discovery preserves exclusions and refreshes additions and removals", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "mockup-discovery-"));
  try {
    const plugin = mockupPreviewPlugin();
    plugin.configResolved({ root });
    const generatedPath = path.join(root, "src/.generated/mockup-components.ts");
    const refresh = async () => {
      await plugin.buildStart();
      return readFile(generatedPath, "utf8");
    };
    assert.match(await refresh(), /export const modules: ModuleMap = \{\s*\};/);

    for (const relativePath of [
      "Visible.tsx",
      "nested/Nested.tsx",
      "_Helper.tsx",
      "_private/Hidden.tsx",
      "nested/_private/Hidden.tsx",
      ".hidden/Hidden.tsx",
      "Ignored.ts",
    ]) {
      const file = path.join(root, "src/components/mockups", relativePath);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, "export default function Component() { return null; }");
    }

    const source = await refresh();
    assert.match(source, /"\.\/components\/mockups\/Visible\.tsx"/);
    assert.match(source, /"\.\/components\/mockups\/nested\/Nested\.tsx"/);
    assert.match(source, /import\("\.\.\/components\/mockups\/nested\/Nested\.tsx"\)/);
    assert.doesNotMatch(source, /Helper|Hidden|Ignored/);
    assert.equal((source.match(/=> import/g) ?? []).length, 2);

    await rm(path.join(root, "src/components/mockups/Visible.tsx"));
    await writeFile(path.join(root, "src/components/mockups/Added.tsx"), "");
    const updated = await refresh();
    assert.doesNotMatch(updated, /Visible\.tsx/);
    assert.match(updated, /Added\.tsx/);
    assert.match(updated, /Nested\.tsx/);
    assert.equal(await refresh(), updated);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
