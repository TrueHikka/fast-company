import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = (length) => {
    const phrase = [" человек тусанет", " человека тусанут"];
    return (
      length +
      phrase[
        length % 100 > 4 && length % 100 < 20
          ? 0
          : length % 10 < 5 && length % 10 > 1
          ? 1
          : 0
      ]
    );
  };

  return (
    <h3>
      <span className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}>
        {length > 0
          ? renderPhrase(length) + " с тобой сегдня"
          : "Никто с тобой не тусанет"}
      </span>
    </h3>
  );
};
export default SearchStatus;
