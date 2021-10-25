import { HTMLAttributes, PropsWithChildren, useMemo } from "react";
import { useTheme } from "../theme";

import TypographySheet from "../theme/TypographySheet";
import style from "../utils/style";

export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  type?: keyof TypographySheet
}

const Typography = ({
  type = 'body3',
  children,
  ...props
}: PropsWithChildren<TypographyProps>): JSX.Element => {
  const theme = useTheme();

  const typeStyle = useMemo(() => {
    const style = theme.typography[type];

    return {
      fontFamily: style.font,
      fontWeight: style.weight,
      fontSize: style.size,
      lineHeight: style.height,
    };
  }, [type, theme.typography]);

  return (
    <div
      {...props}
      style={style(typeStyle, props.style)}
    >
      {children}
    </div>
  )
};

export default Typography;
