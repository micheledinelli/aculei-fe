// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Image {
  id: number;
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
