import React from "react";
import ScrambleText from "./ScrambleText";

export default function AculeiLoader() {
  return (
    <div className="flex justify-center items-center text-3xl p-10">
      <ScrambleText text={"Loading"} keepmovin={true}></ScrambleText>
    </div>
  );
}
