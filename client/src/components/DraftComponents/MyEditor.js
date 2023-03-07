import React, { useState } from "react";
import { convertToRaw, convertFromRaw, Editor, EditorState, RichUtils } from "draft-js";
import { useMutation } from "@apollo/client";

import { SAVE_NOTE } from "../../utils/mutations";

import Button from "../Button/Button";
import ErrorModal from "../Modals/ErrorModal";
import { escapeQuotesforJSON } from "../../utils/helpers";
import "draft-js/dist/Draft.css";

let initialState

function MyEditor({ activeNote }) {

  activeNote === undefined
    ? (initialState = EditorState.createEmpty())
    : (initialState = EditorState.createWithContent(convertFromRaw(activeNote)));

  const [editorState, setEditorState] = useState(initialState);
  const [title, setTitle] = useState("Untitled Note");

  const [saveNote, { error }] = useMutation(SAVE_NOTE);

  if (error) return <ErrorModal message={error.message} activate={true} />;

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

  const handleSubmit = async () => {
    try {
      const contentState = editorState.getCurrentContent();
      const stringifiedContent = JSON.stringify(convertToRaw(contentState));
      const escapedContent = escapeQuotesforJSON(stringifiedContent);
      const noteData = {
        title,
        noteValue: escapedContent,
      };
      const { data } = await saveNote({
        variables: { input: noteData },
      });
      console.log(data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter a title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
      </div>

      <button
        className="myEditorBtn has-background-grey-lighter"
        id="boldBtn"
        onClick={onBoldClick.bind(editorState)}
      >
        B
      </button>
      <button
        className="myEditorBtn has-background-grey-lighter"
        id="underlineBtn"
        onClick={onUnderlineClick.bind(editorState)}
      >
        U
      </button>
      <button
        className="myEditorBtn has-background-grey-lighter"
        id="italicBtn"
        onClick={onItalicClick.bind(editorState)}
      >
        I
      </button>
      <Editor
        className="myNoteEditor"
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
      <Button attr="is-success" action={handleSubmit}>
        Save
      </Button>
    </>
  );
}

export default MyEditor;
