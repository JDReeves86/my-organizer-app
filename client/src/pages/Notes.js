import React, { useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import CustomEditor from "../utils/slateHelpers";
import { useMutation } from "@apollo/client"
import Auth from "../utils/auth";
import Hero from "../components/Hero";
import Button from "../components/Button/Button"
import Navbar from "../components/Navbar/Navbar";
import Column from "../components/Columns/Column";
import DefaultComp from "../components/SlateEditor/DefaultComp";
import Leaf from "../components/SlateEditor/Leaf";
import ErrorModal from "../components/Modals/ErrorModal";
import { SAVE_NOTE } from "../utils/mutations";

function Notes() {
  if (!Auth.loggedIn()) document.location.replace("/login");

  const [initialValue, setInitialValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

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

  const [saveNote, {error, data }] = useMutation(SAVE_NOTE)

  if (error) return <ErrorModal message={error.message} activate={true} />;

  const handleSubmit = async () => {
    try {
      console.log(initialValue)
      const { data } = await saveNote({
        variables: { input: { NoteContent: initialValue }}
      })
    }
    catch(err) {
      throw new Error(err)
    }
  }

  return (
    <>
      <Hero attr={"has-background-info-light has-text-info"}>
        <h1 className="is-size-3 has-text-centered">
          Not your Fathers Planner
        </h1>
      </Hero>
      <Navbar attr={"has-background-grey-lighter"} />
      <Column columns={true}>
        <Column attr={"is-3 has-background-grey-light"}>
          <p>Menu</p>
        </Column>
        <Column attr={"is-9"}>
          <div className="level">
            <div className="level-item level-left">
              <Slate
                editor={editor}
                value={initialValue}
                onChange={value => {
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
                  <Button
                  attr='is-success'
                  action={handleSubmit}
                  >Save</Button>
            </div>
          </div>
          <section className="section">
            <p className="has-background-dark has-text-white">Note previews</p>
          </section>
        </Column>
      </Column>
    </>
  );
}

export default Notes;
