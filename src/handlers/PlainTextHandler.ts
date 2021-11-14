import { Text } from "@pixi/text";

function handlePlainText (item: DataTransferimageItem, callback: (rawText: string, text: Text) => void) {
  item.getAsString((rawText: string) => {
    let text = new Text(rawText);

    callback(rawText, text);
  });
}

export { handlePlainText };