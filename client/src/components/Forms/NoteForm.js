import React from "react";
import { useMutation } from "@apollo/client";
import Button from "../Button/Button";
import ErrorModal from "../Modals/ErrorModal";
import { SAVE_NOTE } from "../../utils/mutations";
import MyEditor from "../DraftComponents/MyEditor";
import "draft-js/dist/Draft.css";

function NoteForm({ note }) {
  console.log(note);

  const [saveNote, { error }] = useMutation(SAVE_NOTE);

  if (error) return <ErrorModal message={error.message} activate={true} />;

  const handleSubmit = async () => {
    try {
      console.log("saved");
      // const testVar = { NoteContent: initialValue };
      // const { data } = await saveNote({
      //   variables: { input: { noteValue: initialValue } },
      // });
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    // bulma level items fucking with text editor. need to figure out formatting.
    <>
      <div className="columns">
        <div className="column">
          <MyEditor />
        </div>
      </div>

      <div className="level-item level-right">
        <Button attr="is-success" action={handleSubmit}>
          Save
        </Button>
      </div>
    </>
  );
}

export default NoteForm;
