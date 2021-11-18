import { Text, TextStyle } from "@pixi/text";

function handlePlainText (
  item: DataTransferItem, 
  callback: (rawText: string, text: Text) => void,
  style?: TextStyle
): void {
  item.getAsString((rawText: string) => {
    let text = new Text(rawText, style);
    text.resolution = 4;

    console.log("boom");

    callback(rawText, text);
  });
}

export { handlePlainText };