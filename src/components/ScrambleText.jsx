import React from "react";
import { useScramble } from "use-scramble";

export default function ScrambleTest({ text }) {
  const { ref, replay } = useScramble({
    text: text,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  return <span ref={ref}>ca</span>;
}
