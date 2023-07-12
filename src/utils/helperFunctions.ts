export const mockWithImage = (path: string) => {
  navigator.mediaDevices.getUserMedia = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context!.drawImage(image, 0, 0, image.width, image.height);
        const stream = canvas.captureStream();
        resolve(stream);
      };
      image.src = path;
    });
  };
};
