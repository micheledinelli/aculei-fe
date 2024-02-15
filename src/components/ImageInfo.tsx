import { useState } from "react";

export default function PhotoInfo({
  datasetInfo,
}: {
  datasetInfo: DatasetInfo;
}) {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [isContentVisible, setContentVisible] = useState(false);

  const handleClick = (key: string) => {
    if (selectedButton === key) {
      setContentVisible(!isContentVisible);
    } else {
      setSelectedButton(key);
      setContentVisible(true);
    }
  };

  return (
    <div className="w-full  absolute bottom-10 overflow-hidden text-white">
      <div className="bg-green-600 pb-2">
        <div
          className="flex justify-between bg-black
         [&>button]:bg-green-600 [&>button]:p-2 [&>button]:cursor-pointer [&>button]:w-min-10  [&>button]:min-w-10"
        >
          <button
            key={"INFO"}
            onClick={() => {
              handleClick("INFO");
            }}
            className={`${selectedButton === "INFO" ? "text-black" : ""}`}
          >
            INFO
          </button>
          {datasetInfo
            ? Object.entries(datasetInfo).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    handleClick(key);
                  }}
                  className={`${selectedButton === key ? "text-black" : ""}`}
                >
                  {key.toString().toUpperCase()}:{" "}
                  {value.toString().toUpperCase()}
                </button>
              ))
            : null}
        </div>

        {isContentVisible && (
          <div className="p-4">
            {`Clicca sul mirino per vedere una foto. I dati mostrati sono relativi
            all'ultima immagine. Per cambiare immagine selezionata
            effettuare un doppio click sull'immagine che si desidera. Le
            immagini possono essere trascinate.`}
            <div
              className="absolute right-2 bottom-2 underline underline-offset-4 cursor-pointer"
              onClick={() => {
                handleClick(selectedButton || "");
              }}
            >
              CLOSE
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
