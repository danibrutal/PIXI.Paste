
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Text } from "@pixi/text";
import { handleImage } from "./handlers/ImageHandler";
import { handlePlainText } from "./handlers/PlainTextHandler";
import { isFunction, isPlainText, isImage } from "./functions";

export interface OnImgCallback {
  (img: Sprite, item: DataTransferItem) : void | boolean;
}

export interface OnTextCallback {
  (text: string) : void | boolean
}

declare global {
  interface Window {
    clipboardData: DataTransfer;
  }
}

export default class PasteContainer extends Container {

  onPasteImageCallback: OnImgCallback;
  onPasteTextCallback: OnTextCallback;

  /**
   * @param parent Container
   */
  constructor(parent: Container) {
    super();
    
    this.setParent(parent);

    // initialize onpaste event handler
    window.document.onpaste = this.onPasteHandler.bind(this);
  }

  /**
   * 
   * @param callback OnTextCallback
   */
   onPasteText (callback: OnTextCallback) {
    this.onPasteTextCallback = callback;
  }

  /**
   * 
   * @param callback OnImgCallback
   */
  onPasteImage (callback: OnImgCallback) {
    this.onPasteImageCallback = callback;
  }

  /**
   * 
   * @param evt ClipboardEvent
   */
  onPasteHandler (evt: ClipboardEvent) {
    const dataTransfer = evt.clipboardData || window.clipboardData as DataTransfer;
    const dataTransferItems = dataTransfer.items;

    for (let transferItem of dataTransferItems) {
      if (isImage(transferItem)) {
        handleImage(transferItem, this);
      }else if(isPlainText(transferItem)) {
        handlePlainText(transferItem, this.onTransformedText.bind(this));
      }
    }
  }

  onTransformedText(rawText: string, PIXI_text: Text): void {
    if (isFunction(this.onPasteTextCallback)) {
      this.onPasteTextCallback(rawText);
    }

    this.addChild(PIXI_text);
  }

}