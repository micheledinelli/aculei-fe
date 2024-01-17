import React from "react";
import { Link } from "react-router-dom";
import { useScramble } from "use-scramble";

export default function AculeiTitle() {
  const { ref, replay } = useScramble({
    text: "ACULEI",
    speed: 0.3,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  return (
    <Link to={"/archive"}>
      <h1
        className="text-6xl fixed top-10 left-10 z-20"
        ref={ref}
        onMouseOver={replay}
        onMouseOut={replay}
      ></h1>
    </Link>
  );
}
