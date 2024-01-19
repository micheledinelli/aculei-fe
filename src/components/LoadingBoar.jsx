import aculei from "../assets/aculei.gif"; // Assicurati che il percorso sia corretto
import ScrambleText from "./ScrambleText";

function LoadingBoar() {
  return (
    <div className="fixed top-0 left-0 h-full w-full overflow-hidden flex items-center justify-center z-50 invert">
      <img
        src={aculei}
        className="w-full h-full object-cover absolute"
        alt="Loading"
      />
      <div className="font-noto text-3xl absolute z-50">
        <ScrambleText text="Loading" keepmovin={true} />
      </div>
    </div>
  );
}

export default LoadingBoar;
