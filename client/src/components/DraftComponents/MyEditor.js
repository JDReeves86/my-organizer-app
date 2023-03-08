import React, { useState, useEffect } from "react";
import {
  convertToRaw,
  convertFromRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import { useMutation } from "@apollo/client";

import { UPDATE_NOTE } from "../../utils/mutations";

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

  const [updateNote, { error }] = useMutation(UPDATE_NOTE);

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
      console.log('update note here!')
      const contentState = content.getCurrentContent();
      const stringifiedContent = JSON.stringify(convertToRaw(contentState));
      const escapedContent = escapeQuotesforJSON(stringifiedContent);
      const noteData = {
        title,
        noteValue: escapedContent,
        _id: activeNote._id
      };
      const { data } = await updateNote({
        variables: { input: noteData },
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <div className="mx-6">
        <input
          className="input is-info my-5"
          type="text"
          defaultValue={defaultTitle}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
      </div>
      <div className="mx-6 editorContainer">
        <button
          className="myEditorBtn has-background-grey-lighter my-2"
          id="boldBtn"
          onClick={onBoldClick.bind(content)}
        >
          B
        </button>
        <button
          className="myEditorBtn has-background-grey-lighter my-2"
          id="underlineBtn"
          onClick={onUnderlineClick.bind(content)}
        >
          U
        </button>
        <button
          className="myEditorBtn has-background-grey-lighter my-2"
          id="italicBtn"
          onClick={onItalicClick.bind(content)}
        >
          I
        </button>
        <Editor
          editorState={content}
          onChange={setContent}
          handleKeyCommand={handleKeyCommand}
        />
        <Button attr="is-info my-4" action={handleSubmit}>
          Save
        </Button>
      </div>
    </>
  );
}

export default MyEditor;
