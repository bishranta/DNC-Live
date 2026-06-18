import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary: "bg-dnc-blue text-white hover:bg-dnc-blue-dark disabled:bg-slate-300",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
