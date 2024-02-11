import { DatasetInfo } from "../pages/Landing";
import silvered_theme from "../assets/silvered_theme.jpg";

export default function Footbar({
  datasetInfo,
}: {
  datasetInfo: DatasetInfo[];
}) {
  return (
    <div
      className="w-full inline-flex flex-nowrap absolute bottom-0 opacity-500 overflow-hidden"
      style={{ backgroundImage: `url(${silvered_theme})` }}
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 my-2 animate-infinite-scroll no-scroll whitespace-nowrap filter invert mix-blend-difference">
        {datasetInfo.map((info) => (
          <li key={info.key}>
            {info.key}: {info.value}
          </li>
        ))}
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 my-2 animate-infinite-scroll no-scroll whitespace-nowrap filter invert mix-blend-difference"
        aria-hidden="true"
      >
        {datasetInfo.map((info) => (
          <li key={info.key}>
            {info.key}: {info.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
