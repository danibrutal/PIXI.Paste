export const isImage = (item: DataTransferItem) => (item.kind == 'file' && item.type.match('^image/'));

export const isPlainText = (item: DataTransferItem) => (item.kind == 'string' && item.type.match('^text/plain$'));

export const isFunction = (cbk: any) => typeof cbk === 'function';