import React, { useState, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Button from "../Button/Button";
import ErrorModal from "../Modals/ErrorModal";
import { SAVE_NOTE } from "../../utils/mutations";

function NoteForm({ note }) {
  console.log(note);
  const [initialValue, setInitialValue] = useState(note);
  console.log(initialValue);

  const [editor] = useState(() => withReact(createEditor()));
 
 
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
        
      </div>
      <div className="level-item level-right">
        <Button attr="is-success" action={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default NoteForm;
