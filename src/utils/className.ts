import Nullish from '@/types/Nullish';

type ClassName = string | Nullish;

const className = (...names: ClassName[]): string => names.filter((it) => it).join(' ');

export default className;
