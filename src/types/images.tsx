// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Image {
  businessLogic: {
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
  };
  imageInfo: {
    [key: string]: string | number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImageId {
  imageId: string;
}
