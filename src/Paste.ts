
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Text, TextStyle } from "@pixi/text";
import { handleImage } from "./transformers/ImageTransformer";
import { handlePlainText } from "./transformers/PlainTextTransformer";
import { isFunction, isPlainText, isImage } from "./functions";

export interface TextConfiguration {
  style: TextStyle
}

export interface ImageConfiguration {
  maxWidth: Number,
  maxHeight: Number
}
export interface PasteConfiguration {
  parent?: Container,
  text?: TextConfiguration
  image?: ImageConfiguration
}
export interface OnImgCallback {
  (img: Sprite) : void | boolean;
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

  configuration: PasteConfiguration;
  onPasteImageCallback: OnImgCallback;
  onPasteTextCallback: OnTextCallback;

  /**
   * @param Container parent
   */
  constructor(config?: PasteConfiguration) {
    super();

    this.configuration = config;

    if (this.configuration.parent instanceof Container) {
      this.setParent(this.configuration.parent);
    }

    // initialize onpaste event handler
    window.document.onpaste = this.onPasteHandler.bind(this);
  }

  /**
   * 
   * @param OnTextCallback callback
   */
   onPasteText (callback: OnTextCallback):void {
    this.onPasteTextCallback = callback;
  }

  /**
   * 
   * @param OnImgCallback callback
   */
  onPasteImage (callback: OnImgCallback): void {
    this.onPasteImageCallback = callback;
  }

  /**
   * 
   * @param ClipboardEvent evt
   */
  onPasteHandler (evt: ClipboardEvent): void {
    const dataTransfer = evt.clipboardData || window.clipboardData as DataTransfer;
    const dataTransferItems = dataTransfer.items;

    for (let transferItem of dataTransferItems) {
      if (isImage(transferItem)) {
        handleImage(transferItem, this.onTransformedImage.bind(this));
      }else if(isPlainText(transferItem)) {
        handlePlainText(
          transferItem, 
          this.onTransformedText.bind(this),
          this.configuration?.text.style
        );
      }
    }
  }

  /**
   * 
   * @param string rawText 
   * @param Text PIXI_text 
   */
  onTransformedText(rawText: string, PIXI_text: Text): void {
    if (isFunction(this.onPasteTextCallback)) {
      this.onPasteTextCallback(rawText);
    }

    if (this.parent) {
      PIXI_text.x = Math.random() * (this.parent.width);
      PIXI_text.y = Math.random() * (this.parent.height);
    }

    this.addChild(PIXI_text);
  }

  /**
   * 
   * @param Sprite PIXI_image 
   */
  onTransformedImage(PIXI_image: Sprite): void {

    if (typeof this.onPasteImageCallback === 'function') {
      this.onPasteImageCallback(PIXI_image);
    }

    if (this.parent) {
      PIXI_image.x = Math.random() * (this.parent.width);
      PIXI_image.y = Math.random() * (this.parent.height);
    }

    this.addChild(PIXI_image);
  }
}