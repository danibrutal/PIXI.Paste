import { Texture } from "@pixi/core";
import { Sprite } from "@pixi/sprite";

function handleImage (imageItem: DataTransferimageItem, callback: (PIXI_image: Sprite) => void) {

  const file = imageItem.getAsFile();
    
    if (null === file) {
      return;
    }

    const reader: FileReader  = new FileReader();

    reader.addEventListener('load', function() {
      let image: Image = new Image();
      image.src = this.result;
      
      const texture = Texture.from(image);
      const sprite = new Sprite(texture);

      callback(sprite);
    });
  
    reader.readAsDataURL(file as Blob);
};

export { handleImage };