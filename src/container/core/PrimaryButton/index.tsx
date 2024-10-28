import React from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

const PrimaryButton = ({
  text = "",
  onClick: action = () => {},
  onEnter: enterAction = () => {},
  onLeave: leaveAction = () => {},
  leftIcon,
  rigthIcon,
  width,
  height,
  variety = "primary",
  disabled = false,
  className = "",
  borderRadius,
  fontWeight,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.custom_button,
        styles[variety],
        { [styles.rigth]: rigthIcon },
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        action();
      }}
      onMouseEnter={enterAction}
      onMouseLeave={leaveAction}
      style={{ width, height, borderRadius, fontWeight }}
      disabled={disabled}
    >
      {leftIcon}
      {text}
      {rigthIcon}
    </button>
  );
};

export default PrimaryButton;
