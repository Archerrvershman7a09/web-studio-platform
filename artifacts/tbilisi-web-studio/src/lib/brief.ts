import { useState } from "react";
export type Brief = {
  values: Record<string, string>;
  selections: Record<string, string[]>;
  references: string[];
};
const key = "studio-brief-v1";
function readBrief(): Brief {
  try {
    const d = JSON.parse(localStorage.getItem(key) || "{}");
    const values = Object.fromEntries(
      Object.entries(d.values || {}).filter(([, v]) => typeof v === "string"),
    ) as Record<string, string>;
    const selections = Object.fromEntries(
      Object.entries(d.selections || {}).filter(
        ([, v]) => Array.isArray(v) && v.every((x) => typeof x === "string"),
      ),
    ) as Record<string, string[]>;
    return {
      values,
      selections,
      references: Array.isArray(d.references)
        ? d.references.filter(
            (r: unknown) =>
              typeof r === "string" &&
              ["cafe", "beauty", "interior"].includes(r),
          )
        : [],
    };
  } catch {
    return { values: {}, selections: {}, references: [] };
  }
}
export function useBrief() {
  const [brief, setBrief] = useState<Brief>(readBrief);
  const [saved, setSaved] = useState(true);
  const update = (fn: (prev: Brief) => Brief) =>
    setBrief((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem(key, JSON.stringify(next));
        setSaved(true);
      } catch {
        setSaved(false);
      }
      return next;
    });
  const value = (name: string, text: string) =>
    update((p) => ({ ...p, values: { ...p.values, [name]: text } }));
  const toggle = (name: string, option: string) =>
    update((p) => {
      const options = p.selections[name] || [];
      return {
        ...p,
        selections: {
          ...p.selections,
          [name]: options.includes(option)
            ? options.filter((v) => v !== option)
            : [...options, option],
        },
      };
    });
  const reference = (name: string) =>
    update((p) => ({
      ...p,
      references: p.references.includes(name)
        ? p.references.filter((v) => v !== name)
        : [...p.references, name],
    }));
  return { brief, saved, value, toggle, reference };
}
