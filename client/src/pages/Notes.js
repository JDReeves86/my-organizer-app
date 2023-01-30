import React, { useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import CustomEditor from "../utils/slateHelpers";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import Hero from "../components/Hero";
import Button from "../components/Button/Button";
import Navbar from "../components/Navbar/Navbar";
import Column from "../components/Columns/Column";
import DefaultComp from "../components/SlateEditor/DefaultComp";
import Leaf from "../components/SlateEditor/Leaf";
import ErrorModal from "../components/Modals/ErrorModal";
import Loader from "../components/Loader/Loader";
import NoteMenu from "../components/Menu/NoteMenu";
import { SAVE_NOTE } from "../utils/mutations";
import { GET_MY_NOTES } from "../utils/queries";
import NoteForm from "../components/Forms/NoteForm";

function Notes() {
  if (!Auth.loggedIn()) document.location.replace("/login");

  const [activeNote, setActiveNote] = useState([{
    type: 'paragraph',
    children: [{
      text: ''
    }]
  }])

  let { data, loading } = useQuery(GET_MY_NOTES);
  if (loading) return <Loader />
  console.log(activeNote)
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
          <NoteMenu list={data} action={setActiveNote}/>
        </Column>
        <Column attr={"is-9"}>
          <NoteForm note={activeNote}/>
          <section className="section">
            <p className="has-background-dark has-text-white">Note previews</p>
          </section>
        </Column>
      </Column>
    </>
  );
}

export default Notes;
