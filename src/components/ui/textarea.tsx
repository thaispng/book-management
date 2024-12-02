import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-semibold text-zinc-800 font-montserrat",
              className
            )}
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "flex w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-base text-gray-200 ring-offset-gray-900 placeholder:text-zinc-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-montserrat",
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

Textarea.displayName = "Textarea";

export { Textarea };
