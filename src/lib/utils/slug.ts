import slugifyLib from "slugify";

const turkishMap: Record<string, string> = {
  "\u011F": "g",
  "\u011E": "g",
  "\u00FC": "u",
  "\u00DC": "u",
  "\u015F": "s",
  "\u015E": "s",
  "\u0131": "i",
  "\u0130": "i",
  "\u00F6": "o",
  "\u00D6": "o",
  "\u00E7": "c",
  "\u00C7": "c",
};

export function slugify(text: string): string {
  let result = text;
  for (const [from, to] of Object.entries(turkishMap)) {
    result = result.replace(new RegExp(from, "g"), to);
  }
  return slugifyLib(result, {
    lower: true,
    strict: true,
    trim: true,
  });
}
