
import { Container } from "@pixi/display";
import { Texture } from "@pixi/core";
import { Sprite } from "@pixi/sprite";
import { Text } from "@pixi/text";


declare global {
  interface Window {
    clipboardData: DataTransfer;
  }
}

const isImage = (item: DataTransferItem) => (item.kind == 'file' && item.type.match('^image/'));
const isPlainText = (item: DataTransferItem) => (item.kind == 'string' && item.type.match('^text/plain$'));

class PasteContainer extends Container {
  constructor(parent: Container) {
    super();

    this.setParent(parent);
    window.document.onpaste = (evt: ClipboardEvent) => {
      const dT = evt.clipboardData || window.clipboardData as DataTransfer;
      const items = dT.items;
  
      for (let index in items) {
        if (isImage(items[index])) {
          this.handleImage(items[index]);
        }else if(isPlainText(items[index])) {
          this.handlePlainText(items[index]);
        }
      }
    }
  }

  handlePlainText (item: DataTransferItem) {
    item.getAsString((string) => {
      let text = new Text(string);

      this.addChild(text);
    });
  }

  handleImage (item: DataTransferItem) {
    const file = item.getAsFile();
    const reader: FileReader  = new FileReader();
  
    reader.onload = (e) =>  {
      const image: HTMLImageElement = document.createElement("img");
      image.src = reader.result as string;
      
      const texture = Texture.from(image);
      const sprite = new Sprite(texture);
      sprite.x = Math.random() * (this.parent.width * 0.7);
      sprite.y = Math.random() * (this.parent.height * 0.7);

      this.addChild(sprite);
    }
  
    reader.readAsDataURL(file);
  };
}

export { PasteContainer };