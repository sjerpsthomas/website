
export function getDictKeys<T>(obj: T) {
  return Object.keys(obj as Record<string, unknown>) as Array<keyof T>;
}