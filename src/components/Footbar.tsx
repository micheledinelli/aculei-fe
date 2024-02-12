import aculeo from "../assets/aculeo.png";
import { useEffect, useState } from "react";

export default function Footbar({ path }: { path: string }) {
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo | null>(null);
  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + `/api/v1/${path}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData: DatasetInfo) => {
        setDatasetInfo(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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
            {key}:{value.toString()}
          </li>
        ))}
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 my-2 animate-infinite-scroll no-scroll whitespace-nowrap filter invert mix-blend-difference"
        aria-hidden="true"
      >
        {Object.entries(datasetInfo).map(([key, value]) => (
          <li key={key}>
            {key}:{value.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
