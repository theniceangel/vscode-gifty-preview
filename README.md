# vscode-gifty-preview README

Provide a custom editor to render files which contains following data structure.

## Notice

> only support vscode 1.65+

## data structure

```ts
interface ImageMetaData = {
  remoteUrl: string // image src
  localFilePath: string // image file path in your computer
  name: string // image name
  width: number
  height: number
  size: string // sizeInfo, such as '16kb'
}

// the content of a.gifty file
[
  {
    "remoteUrl": "https://gift-pypu-cdn.didistatic.com/static/driver_miniprogram/do1_rDiZeZm36LdulEDn4P5U",
    "localFilePath": "your image absolute path",
    "name": "123.png",
    "width": 1182,
    "height": 1182,
    "size": "17kb"
  }
  // ...
] as ImageMetaData[]

```

## preview

![](https://dpubstatic.udache.com/static/dpubimg/YbfiRQotFy/preview.gif)
