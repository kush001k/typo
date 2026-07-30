import { memo, useRef, useEffect } from "react";

function TypeInput({ value, onChange, hasError, disabled, placeholder }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder || "TYPE HERE..."}
        aria-label="Current word"
          className={`w-full text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight
          bg-transparent px-0 py-4 outline-none transition-colors
          placeholder:text-muted placeholder:font-normal placeholder:tracking-wider
          ${
            hasError
              ? "text-error"
              : "text-fg"
          }
          disabled:opacity-40`}
      />
    </div>
  );
}

export default memo(TypeInput);