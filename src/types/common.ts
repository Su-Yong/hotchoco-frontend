export type StringLike = string | number | bigint | boolean | { [key: string | number | symbol]: unknown; toString: () => string };
