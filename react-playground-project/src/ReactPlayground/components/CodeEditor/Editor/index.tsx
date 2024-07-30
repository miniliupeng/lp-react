import MonacoEditor, { OnMount, EditorProps } from "@monaco-editor/react";
import { createATA } from "./ata";
import { editor } from "monaco-editor";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface Props {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props;

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 添加格式化快捷键 ctrl + j
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
      // 查看所有 action
      // let actions = editor.getSupportedActions().map((a) => a.id);
      // console.log(actions);
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve, // 解决Cannot use JSX unless the '--jsx' flag is provided.(17004)
      esModuleInterop: true, // 设置 esModuleInterop 会在编译的时候自动加上 default 属性
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height={"100%"}
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false, // 关闭: 到了最后一行之后依然可以滚动一屏
        minimap: {
          enabled: false, // 关掉缩略图
        },
        scrollbar: {
          verticalScrollbarSize: 6, // 滚动条宽度
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
}
