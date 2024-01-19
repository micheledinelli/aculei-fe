import React from "react";
import { useScramble } from "use-scramble";

export default function ScrambleText({ text }) {
  const { ref } = useScramble({
    text: text,
    speed: 0.3,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
    overdrive: true,
  });

  return <span ref={ref}>{text}</span>;
}
