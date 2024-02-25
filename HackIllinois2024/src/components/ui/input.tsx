import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  numeric?: boolean; // New prop to determine if the input should be numeric
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, numeric, ...props }, ref) => {
    // Conditionally set the input type
    const inputType = numeric ? "number" : type;

    return (
      <input
        type={inputType}
        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black dark:text-white dark:placeholder:text-muted-foreground ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
