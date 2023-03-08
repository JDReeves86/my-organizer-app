import React, { useState, useEffect } from "react";
import {
  convertToRaw,
  convertFromRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import { useMutation } from "@apollo/client";

import { SAVE_NOTE } from "../../utils/mutations";

import Button from "../Button/Button";
import ErrorModal from "../Modals/ErrorModal";
import {
  escapeQuotesforJSON,
  unescapeQuotesforJSON,
} from "../../utils/helpers";
import "draft-js/dist/Draft.css";

function MyEditor({ activeNote }) {
  const [content, setContent] = useState(EditorState.createEmpty());
  const [defaultTitle, setDefaultTitle] = useState("");

  useEffect(() => {
    if (activeNote !== undefined) {
      const noteContent = unescapeQuotesforJSON(activeNote.noteValue);
      setDefaultTitle(activeNote.title);
      setContent(EditorState.createWithContent(convertFromRaw(noteContent)));
    } else {
      setContent(EditorState.createEmpty());
    }
  }, [activeNote]);

  const [title, setTitle] = useState("Untitled Note");

  const [saveNote, { error }] = useMutation(SAVE_NOTE);

  if (error) return <ErrorModal message={error.message} activate={true} />;

  if (!content) {
    return <h1>Loading</h1>;
  }

  const handleKeyCommand = (command, content) => {
    const newState = RichUtils.handleKeyCommand(content, command);
    if (newState) {
      setContent(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onBoldClick = () => {
    setContent(RichUtils.toggleInlineStyle(content, "BOLD"));
  };

  const onItalicClick = () => {
    setContent(RichUtils.toggleInlineStyle(content, "ITALIC"));
  };

  const onUnderlineClick = () => {
    setContent(RichUtils.toggleInlineStyle(content, "UNDERLINE"));
  };

  const handleSubmit = async () => {
    try {
      const contentState = content.getCurrentContent();
      const stringifiedContent = JSON.stringify(convertToRaw(contentState));
      const escapedContent = escapeQuotesforJSON(stringifiedContent);
      const noteData = {
        title,
        noteValue: escapedContent,
      };
      const { data } = await saveNote({
        variables: { input: noteData },
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <div>
        {activeNote === undefined && (
          <input
            className="input"
            type="text"
            placeholder="Enter a Title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
        )}
        {activeNote && (
          <input
            className="input"
            type="text"
            defaultValue={defaultTitle}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
        )}
      </div>

      <button
        className="myEditorBtn has-background-grey-lighter"
        id="boldBtn"
        onClick={onBoldClick.bind(content)}
      >
        B
      </button>
      <button
        className="myEditorBtn has-background-grey-lighter"
        id="underlineBtn"
        onClick={onUnderlineClick.bind(content)}
      >
        U
      </button>
      <button
        className="myEditorBtn has-background-grey-lighter"
        id="italicBtn"
        onClick={onItalicClick.bind(content)}
      >
        I
      </button>
      <Editor
        className="input"
        editorState={content}
        onChange={setContent}
        handleKeyCommand={handleKeyCommand}
      />
      <Button attr="is-success" action={handleSubmit}>
        Save
      </Button>
    </>
  );
}

export default MyEditor;
