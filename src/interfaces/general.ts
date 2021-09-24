export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | {
      'weather': JSONValue,
      [k: string]: JSONValue
    };
