import { ui, defaultLang, languages } from "@/i18n/ui";

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Interpolates a localized string (loaded with the i18nKey) to a given reference string.
 */
export const interpolate = (
  i18nKey: keyof (typeof ui)[typeof defaultLang],
  referenceString: string,
  lang: string
): string => {
  const t = useTranslations(lang as keyof typeof languages);
  const localizedString = t(i18nKey);

  const tagsRegex = /<([\w\d]+)([^>]*)>/gi;

  const referenceStringMatches = referenceString.match(tagsRegex);

  if (!referenceStringMatches) {
    console.warn(
      "WARNING(astro-i18next): default slot does not include any HTML tag to interpolate! You should use the `t` function directly."
    );
    return localizedString;
  }

  const referenceTags = [] as Array<{ name: string; attributes: string }>;
  referenceStringMatches.forEach((tagNode) => {
    const tagsRegexResult = tagsRegex.exec(tagNode);
    const name = tagsRegexResult ? tagsRegexResult[1] : "";
    const attributes = tagsRegexResult ? tagsRegexResult[2] : "";
    referenceTags.push({ name, attributes });

    // reset regex state
    tagsRegex.exec("");
  });

  let interpolatedString = localizedString as string;
  for (let index = 0; index < referenceTags.length; index++) {
    const referencedTag = referenceTags[index];
    // Replace opening tags
    interpolatedString = interpolatedString.replaceAll(
      `<${index}>`,
      `<${referencedTag.name}${referencedTag.attributes}>`
    );
    // Replace closing tags
    interpolatedString = interpolatedString.replaceAll(
      `</${index}>`,
      `</${referencedTag.name}>`
    );
  }

  return interpolatedString;
};
