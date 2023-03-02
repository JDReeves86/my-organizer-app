import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const initialState = EditorState.createEmpty();

function MyEditor() {
  const [editorState, setEditorState] = useState(initialState);
  const [boldToggle, setBoldToggle] = useState(false);
  console.log(boldToggle);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  return (
    <>
      <button className="myEditorBtn has-background-grey-lighter" id="boldBtn" onClick={onBoldClick.bind(editorState)}>B</button>
      <button className="myEditorBtn has-background-grey-lighter" id="underlineBtn" onClick={onUnderlineClick.bind(editorState)}>U</button>
      <button className="myEditorBtn has-background-grey-lighter" id="italicBtn" onClick={onItalicClick.bind(editorState)}><em>I</em></button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="hello type something"
      />
    </>
  );
}

export default MyEditor;
