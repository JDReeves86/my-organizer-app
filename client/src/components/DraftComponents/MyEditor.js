import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import 'draft-js/dist/Draft.css';

const initialState = EditorState.createEmpty();

function MyEditor() {
  const [editorState, setEditorState] = useState(initialState);
  console.log(editorState)

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  return (
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="hello type something"
      />
  );
}

export default MyEditor;
