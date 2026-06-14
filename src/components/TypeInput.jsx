import { memo, useRef, useEffect } from "react";

function TypeInput({ value, onChange, hasError, disabled, placeholder }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder || "TYPE HERE..."}
      aria-label="Current word"
      className={`w-full text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight
        bg-transparent border-b-2 px-0 py-4 outline-none transition-colors
        placeholder:text-muted placeholder:font-normal placeholder:tracking-wider
        ${
          hasError
            ? "border-error text-error"
            : "border-border focus:border-accent text-fg"
        }
        disabled:opacity-40`}
    />
  );
}

export default memo(TypeInput);