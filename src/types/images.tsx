// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Image {
  id: number;
  sha256: string;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
  isFullScreen: boolean;
  zIndex: number;
  dragStartX: number;
  dragStartY: number;
}

interface ImageId {
  imageId: string;
}
