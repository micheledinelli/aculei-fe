import aculeo from "../assets/aculeo.png";
import React from "react";

interface FootbarProps {
  datasetInfo: DatasetInfo | null;
}

const Footbar: React.FC<FootbarProps> = ({ datasetInfo }) => {
  if (!datasetInfo) {
    return null;
  }

  return (
    <div
      className="font-mono_lite w-full inline-flex flex-nowrap absolute bottom-0 opacity-500 overflow-hidden"
      style={{ backgroundImage: `url(${aculeo})` }}
    >
      <ul className="hover:pause z-10 flex items-center justify-center md:justify-start [&_li]:mx-8 my-2 animate-infinite-scroll no-scroll whitespace-nowrap filter invert mix-blend-difference">
        {Object.entries(datasetInfo).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footbar;
