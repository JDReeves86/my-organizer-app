import React, { useState, useCallback, useEffect } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import CustomEditor from "../../utils/slateHelpers";
import { useMutation, useQuery } from "@apollo/client";
import Button from "../Button/Button";
import DefaultComp from "../SlateEditor/DefaultComp";
import Leaf from "../SlateEditor/Leaf";
import ErrorModal from "../Modals/ErrorModal";
import { SAVE_NOTE } from "../../utils/mutations";


function NoteForm({ note }) {
  console.log(note)
    const [initialValue, setInitialValue] = useState(note);
      console.log(initialValue)
      useEffect(() => {
        setInitialValue(note)
      }, [note])
    
      const [editor] = useState(() => withReact(createEditor()));
      const renderElement = useCallback((props) => {
        switch (props.element.type) {
          default:
            return <DefaultComp {...props} />;
        }
      }, []);
      const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
      }, []);
      const [saveNote, { error }] = useMutation(SAVE_NOTE);

      if (error) return <ErrorModal message={error.message} activate={true} />;
    
      const handleSubmit = async () => {
        try {
          const testVar = { NoteContent: initialValue };
          const { data } = await saveNote({
            variables: { input: { noteValue: initialValue } },
          });
        } catch (err) {
          throw new Error(err);
        }
      };
    return (
<div className="level">
            <div className="level-item level-left">
              <Slate
                editor={editor}
                value={initialValue}
                onChange={(value) => {
                  const isAstChange = editor.operations.some(
                    (op) => "set_selection" !== op.type
                  );
                  if (isAstChange) {
                    setInitialValue(value);
                    const content = JSON.stringify(value);
                    localStorage.setItem("content", content);
                  }
                }}
              >
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  onKeyDown={(event) => {
                    if (!event.ctrlKey) {
                      return;
                    }
                    switch (event.key) {
                      case "b":
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                        break;
                    }
                  }}
                />
              </Slate>
            </div>
            <div className="level-item level-right">
              <Button attr="is-success" action={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
    )
}

export default NoteForm