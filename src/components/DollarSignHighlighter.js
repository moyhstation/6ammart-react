import React from "react";

const DollarSignHighlighter = ({ theme, text }) => {
  const regex = /\$\w+\$/g;
  const matches = text?.match(regex);
  return (
    <>
      {text &&
        text.split(/\s+/).map((part, index) => {
          const isMatch = matches && matches.includes(part);
          const normalizedPart = part.replaceAll("$", " ");
          return (
            <span
              key={index}
              style={{
                color: isMatch ? theme.palette.primary.main : "inherit",
                marginLeft: index !== 0 && "3px",
              }}
            >
              {index !== 0 && " "}
              {normalizedPart}
            </span>
          );
        })}
    </>
  );
};

export default DollarSignHighlighter;
