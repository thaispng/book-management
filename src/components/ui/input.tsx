import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, type, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label
            className={cn(
              "text-sm font-semibold text-zinc-800 font-montserrat",
              className
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={props.id}
          className={cn(
            "flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-base text-gray-200 ring-offset-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-200 placeholder:text-zinc-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-montserrat",
            error && "border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-500 font-montserrat">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
