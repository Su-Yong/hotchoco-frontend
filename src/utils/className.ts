type ClassName = string | undefined;

const className = (...names: ClassName[]): string => names.filter((it) => it).join(' ');

export default className;
