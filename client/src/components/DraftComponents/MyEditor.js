import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import 'draft-js/dist/Draft.css';

const initialState = EditorState.createEmpty();

function MyEditor() {
  const [editorState, setEditorState] = useState(initialState);

  return (
    <div className="level-item level-left" style={{ background: "red" }}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="hello type something"
      />
    </div>
  );
}

export default MyEditor;
