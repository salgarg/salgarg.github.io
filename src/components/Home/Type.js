import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Product Manager",
          "Computer Engineer",
          "Creative"
        ],
        autoStart: true,
        loop: true,
        typeSpeed: 90,
        deleteSpeed: 95,
      }}
    />
  );
}

export default Type;
