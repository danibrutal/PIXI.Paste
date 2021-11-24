# PIXI.Paste

'pixi-paste' is a PIXI plugin to handle pasted images and text in PIXI.

## Install it 

```
npm i pixi-paste'
```

## Example

```js
const app = new PIXI.Application({
    width: 400, 
    height: 400, 
    backgroundColor: 0x802A22
});

const container = new PIXI.Container();

// Our Paste Container
const pasteContainer = new PasteContainer({
  parent: container,
  text: { style }
});

// Some styles for pasted Text!
const style = new PIXI.TextStyle({
    fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
    fontStyle: "italic",
    fontVariant: "small-caps",
    fontWeight: "bolder",
    fill: 0xffffff
});

// Event where you you can pass a callback to intercept the text
pasteContainer.onPasteText((text) => {
  console.log(text);
});


// Similar for the image!
pasteContainer.onPasteImage((image) => {
  // Listen for animate update
  app.ticker.add((delta) => {
      // just for fun, let's rotate the image
      image.rotation += 0.01 * delta;
  });
});

app.stage.addChild(container);
container.addChild(pasteContainer);
```
## How to contribute

Just make PR.

Some possible features missing:
- Pass relevant info in both onPasteText and onPasteImage callbacks
- Allow returning `false` on those callbacks, to not include the pasted content
- Allow removing pasted images and text
- ...
