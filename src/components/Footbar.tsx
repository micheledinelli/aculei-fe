import silvered_theme from "../assets/silvered_theme.jpg";
interface FootbarProps {
  datasetInfo: DatasetInfo | null;
}

const Footbar: React.FC<FootbarProps> = ({ datasetInfo }) => {
  if (!datasetInfo) {
    return null;
  }

  return (
    <div
      className="w-full inline-flex flex-nowrap absolute bottom-0 opacity-500 overflow-hidden"
      style={{ backgroundImage: `url(${silvered_theme})` }}
    >
      <ul className="hover:pause z-10 flex items-center justify-center md:justify-start [&_li]:mx-8 my-2 animate-infinite-scroll no-scroll whitespace-nowrap filter invert mix-blend-difference">
        {Object.entries(datasetInfo).flatMap(
          ([category, items]: [string, Record<string, number>]) =>
            Object.entries(items).map(([item, count]) => (
              <li key={`${category}-${item}`}>
                {category}: {item}: {count}
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default Footbar;
