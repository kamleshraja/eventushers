import React from "react";

export function renderFormattedHeading(text: string, highlight?: string) {
  if (!text) return null;

  // 1. Check for curly braces syntax {word}
  if (text.includes("{") && text.includes("}")) {
    const parts = text.split(/(\{.*?\})/g);
    return (
      <>
        {parts.map((part, idx) => {
          if (part.startsWith("{") && part.endsWith("}")) {
            const inner = part.slice(1, -1);
            return (
              <span key={idx} className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
                {inner}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  }

  // 2. Check for explicit highlight phrase
  if (highlight && highlight.trim() && text.includes(highlight.trim())) {
    const parts = text.split(highlight.trim());
    return (
      <>
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {part}
            {idx < parts.length - 1 && (
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
                {highlight.trim()}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  }

  return text;
}
