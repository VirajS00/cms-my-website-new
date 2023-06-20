import { Component } from "solid-js";

type Props = {
  color?: "light" | "dark";
  size?: "lg" | "md" | "sm";
};

export const Loader: Component<Props> = (props) => {
  const color = props.color ?? "dark";
  const size = props.size ?? "md";

  return (
    <div
      classList={{
        "rounded-full animate-spin": true,
        "border-white/40 border-r-white": color === "light",
        "border-gray-300 border-r-blue-500": color === "dark",
        "border-2 h-12 w-12": size === "lg",
        "border-2 h-8 w-8": size === "md",
        "border h-6 w-6": size === "sm",
      }}
    ></div>
  );
};
