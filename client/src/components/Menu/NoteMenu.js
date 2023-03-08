import { useQuery, useLazyQuery } from "@apollo/client";
import React from "react";
import ErrorModal from "../Modals/ErrorModal";
import { trimNote } from "../../utils/helpers";
import { FragmentsOnCompositeTypesRule } from "graphql";
import { GET_SINGLE_NOTE } from "../../utils/queries";

function NoteMenu({ list, action }) {
  const [getNote, { data, loading, error }] = useLazyQuery(GET_SINGLE_NOTE);

  if (error) return <ErrorModal message={error.message} activate={true} />;

  const {
    getMyNotes: { notes },
  } = list;

  const trimmedNotes = notes.map((el) => {
    return {
      _id: el._id,
      text: trimNote(el.title),
    };
  });

  const handleClick = async (event) => {
    const clicked = event.target.attributes.noteid.value;
    const clickedNote = await getNote({
      variables: { noteId: trimmedNotes[clicked]._id },
    });
    action(clickedNote.data.getNote);
  };

  return (
    <aside className="menu pl-2 pt-4">
      <p className="menu-label has-text-white px-3">My Notes</p>
      <ul className="menu-list">
        <li>
          {trimmedNotes.map((el, i) => {
            return (
              <a key={el._id} noteid={i} onClick={handleClick}>
                {el.text}
              </a>
            );
          })}
        </li>
      </ul>
    </aside>
  );
}

export default NoteMenu;
