import { Text, TextStyle } from "@pixi/text";

function handlePlainText (
  item: DataTransferimageItem, 
  callback: (rawText: string, text: Text) => void,
  style?: TextStyle
): void {
  item.getAsString((rawText: string) => {
    let text = new Text(rawText, style);

    callback(rawText, text);
  });
}

export { handlePlainText };