export const flattenKey = <T>(obj: T) => {
  const flatten = (prev: Record<string, unknown>, key: string, value: unknown, pre = ''): Record<string, unknown> => {
    const prefix = [pre, key].filter((it) => !!it).join('.');

    return value && typeof value === 'object'
      ? Object.keys(value).reduce((prev, curr) => flatten(prev, curr, value[curr as keyof typeof value], prefix), prev)
      : Object.assign(prev, { [prefix]: value });
  };

  return Object.keys(obj).reduce((prev, curr) => flatten(prev, curr, obj[curr as keyof typeof obj]), {});
};
