export type Exists<T> = {
  [ Property in keyof T ]: Exclude<T[ Property ], undefined>;
};

export const pick = <T extends Record<string, unknown>, K extends keyof T>(obj: T, ...keys: K[]): Exists<Pick<T, K>> => {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }

    return acc;
    //@ts-ignore
  }, {} as any);
};
