import Navbar from "../components/Navbar";
import Footbar from "../components/Footbar";

export default function About() {
  return (
    <div className="font-texgyreheros_regular">
      <Navbar showHome={true} />
      <Footbar path="dataset" />
    </div>
  );
}
