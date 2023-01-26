import React, { useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Auth from "../utils/auth";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";
import Column from "../components/Columns/Column";
import DefaultComp from "../components/SlateEditor/DefaultComp";
import Leaf from "../components/SlateEditor/Leaf";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function Notes() {
  if (!Auth.loggedIn()) document.location.replace("/login");
  const [initialValue, setInitialValue] = useState({})
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
              <Slate editor={editor} value={initialValue}>
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
                        Transforms.setNodes(
                          editor,
                          { bold: true },
                          { match: (n) => Text.isText(n), split: true }
                        );
                        break;
                    }
                  }}
                />
              </Slate>
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
