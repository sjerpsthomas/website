import {useMessages, useTranslations} from "next-intl";

export function useTranslationsObject<T>(namespace: string, attribute?: string): [string[], Record<string, T>] {
  // Translation function
  const t = useTranslations(namespace);

  // Get correct messages object
  const indices = namespace.split('.');
  let obj: Record<string, unknown> = useMessages();
  while (indices.length > 0)
    obj = obj[indices.shift() as string] as Record<string, unknown>;

  // Get all keys (maybe get nested attribute)
  const keys = Object.keys(obj).map((key) => {
    return attribute != undefined ? key + '.' + attribute : key;
  });

  // Get all translation from its keys
  const record = Object.fromEntries(
    keys.map(key => [key, t(key) as T])
  )

  return [keys, record];
}