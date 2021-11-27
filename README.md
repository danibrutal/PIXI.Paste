# PIXI.Paste

'pixi-paste' is a PIXI plugin to handle pasted images and text in PIXI.

## Install it 

```
npm i pixi-paste
```

## Example

```js
const app = new PIXI.Application({
    width: 400, 
    height: 400, 
    backgroundColor: 0x802A22
});

// Some styles for pasted Text!
const style = new PIXI.TextStyle({
    fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
    fill: 0xffffff
});

/**
  * Our Paste Container.
  * Optionally, you can specify the parent of the container.
  */
const pasteContainer = new PasteContainer({
  parent: app.stage, 
  text: { style }
});

// Event where you you can pass a callback to intercept the text
pasteContainer.onPasteText((pastedText) => {
  console.log(pastedText);
});

// Similar for the image!
pasteContainer.onPasteImage((image) => {
  // Listen for animate update
  app.ticker.add((delta) => {
      // just for fun, let's rotate the image
      image.rotation += 0.01 * delta;
  });
});

app.stage.addChild(pasteContainer);
```
## How to contribute

Just make PR.