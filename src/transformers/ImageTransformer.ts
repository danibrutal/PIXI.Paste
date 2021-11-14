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

      // image.addEventListener('load', function() {
      //   console.log(this.width, this.height);
      // });

      //console.log(file);
      
      const texture = Texture.from(image);
      const sprite = new Sprite(texture);

      console.log(sprite.width, sprite.height);

      callback(sprite);
    });
  
    reader.readAsDataURL(file as Blob);
};

export { handleImage };