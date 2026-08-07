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
              <span
                key={idx}
                className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent font-extrabold inline-block"
              >
                {inner}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  }

  // 2. Check for explicit highlight phrase (case-insensitive)
  if (highlight && highlight.trim()) {
    const trimmedHighlight = highlight.trim();
    const escaped = trimmedHighlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");

    if (regex.test(text)) {
      const parts = text.split(regex);
      return (
        <>
          {parts.map((part, idx) => {
            if (part.toLowerCase() === trimmedHighlight.toLowerCase()) {
              return (
                <span
                  key={idx}
                  className="text-gradient-amber"
                >
                  {part}
                </span>
              );
            }
            return part;
          })}
        </>
      );
    }
  }

  return text;
}
