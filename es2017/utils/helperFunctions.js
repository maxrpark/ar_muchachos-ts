export var mockWithImage = function (path) {
    navigator.mediaDevices.getUserMedia = function () {
        return new Promise(function (resolve) {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            var image = new Image();
            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, image.width, image.height);
                var stream = canvas.captureStream();
                resolve(stream);
            };
            image.src = path;
        });
    };
};
//# sourceMappingURL=helperFunctions.js.map