import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "product manager",
          "computer engineer",
          "creative"
        ],
        autoStart: true,
        loop: true,
        typeSpeed: 90,
        deleteSpeed: 95,
        wrapperClassName: "typewriter",
        cursorClassName: "typewriter-cursor"
      }}
    />
  );
}

export default Type;
