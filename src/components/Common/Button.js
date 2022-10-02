import React from "react";
import { cx, css } from "@emotion/css";

const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      // emotion css
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "rgba(52, 69, 99, 0.7)"
            : "#ccc"};
        `
      )}
    />
  )
);

export default Button;
