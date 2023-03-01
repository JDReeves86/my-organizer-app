import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import 'draft-js/dist/Draft.css';

const initialState = EditorState.createEmpty();

function MyEditor() {
  const [editorState, setEditorState] = useState(initialState);

  return (
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="hello type something"
      />
  );
}

export default MyEditor;
