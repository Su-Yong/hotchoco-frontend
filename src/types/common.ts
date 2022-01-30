export type StringLike = string | number | bigint | boolean | symbol | { [key: string | number | symbol]: unknown; toString: () => string };
