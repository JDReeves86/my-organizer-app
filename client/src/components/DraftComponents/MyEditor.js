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

  return (
    <>
      <button onClick={onBoldClick.bind(editorState)}>Bold</button>

      <button onClick={onItalicClick.bind(editorState)}>italic</button>
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
