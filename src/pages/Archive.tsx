import Footbar from "../components/Footbar";
import Navbar from "../components/Navbar";

export default function Archive() {
  return (
    <>
      <Navbar showHome={true} />
      <Footbar path="dataset" />
    </>
  );
}
