import React from "react";
import { useScramble } from "use-scramble";

export default function ScrambleText({ text, keepmovin }) {
  const { ref, replay } = useScramble({
    text: text,
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 6,
    seed: 0,
    overdrive: true,
  });

  if (keepmovin) {
    return (
      <span ref={ref} onMouseOver={replay} onMouseOut={replay}>
        {text}
      </span>
    );
  }

  return <span ref={ref}>{text}</span>;
}
