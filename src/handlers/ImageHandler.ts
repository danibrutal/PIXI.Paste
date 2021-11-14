import { Texture } from "@pixi/core";
import { Sprite } from "@pixi/sprite";
import PasteContainer from "src";

function handleImage (imageItem: DataTransferimageItem, pasteContainer: PasteContainer) {

  const file = imageItem.getAsFile();
    
    if (null === file) {
      return;
    }

    const reader: FileReader  = new FileReader();
  
    reader.onload = (e) =>  {
      const image: HTMLImageElement = document.createElement("img");
      image.src = reader.result as string;
      
      const texture = Texture.from(image);
      const sprite = new Sprite(texture);
      sprite.x = Math.random() * (pasteContainer.parent.width * 0.7);
      sprite.y = Math.random() * (pasteContainer.parent.height * 0.7);

      if (typeof pasteContainer.onPasteImageCallback === 'function') {
        pasteContainer.onPasteImageCallback(sprite, imageItem);
      }

      pasteContainer.addChild(sprite);
    }
  
    reader.readAsDataURL(file as Blob);
};

export { handleImage };