import React from "react";
import { useMutation } from "@apollo/client";
import Button from "../Button/Button";
import ErrorModal from "../Modals/ErrorModal";
import { SAVE_NOTE } from "../../utils/mutations";
import MyEditor from "../DraftComponents/MyEditor";

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
    <div className="level">
      <MyEditor />

      <div className="level-item level-right">
        <Button attr="is-success" action={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default NoteForm;
