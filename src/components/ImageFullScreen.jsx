export default function ImageFullScreen(imageUrl, toggleFullScreen, index) {
  <img
    src={imageUrl}
    className="absolute top-0 left-0 w-screen h-screen object-scale-down z-[9999]"
    onClick={() => toggleFullScreen(index)}
  />;
  return;
}
