@babel/standalone babel 的浏览器版本   实时把 tsx 代码编译为 js

import引入的文件： 把一段 JS 代码，用 URL.createObjectURL 和 new Blob 的方式变为一个 url

引入 react 和 react-dom 的包：  import maps  +  esm.sh


编辑器 @monaco-editor/react  ,类型自动导入  @typescript/ata

预览 iframe,通过 postMessage 和父窗口通信来显示代码运行时的错误

通过 fflate + btoa 实现了文件内容的编码、解码，可以通过链接分享代码

 Web Worker 拆分编译逻辑到 worker 线程来进行性能优化，消除了 long lask