import { Texture } from "@pixi/core";
import { Sprite } from "@pixi/sprite";

function handleImage (imageItem: DataTransferItem, callback: (PIXI_image: Sprite) => void) {

  const file = imageItem.getAsFile();
    
    if (null === file) {
      return;
    }

    const reader: FileReader  = new FileReader();

    reader.addEventListener('load', function() {
      let image: HTMLImageElement = window.document.createElement('img');
      image.src = this.result as string;
      
      const texture = Texture.from(image);
      const sprite = new Sprite(texture);

      callback(sprite);
    });
  
    reader.readAsDataURL(file as Blob);
};

export { handleImage };