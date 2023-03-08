import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_NOTES } from "../utils/queries";

import { unescapeQuotesforJSON } from "../utils/helpers";

import Auth from "../utils/auth";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";
import Column from "../components/Columns/Column";
import Loader from "../components/Loader/Loader";
import NoteMenu from "../components/Menu/NoteMenu";
import MyEditor from "../components/DraftComponents/MyEditor";

function Notes() {
  if (!Auth.loggedIn()) document.location.replace("/login");

  const [activeNote, setActiveNote] = useState();

  let { data, loading } = useQuery(GET_MY_NOTES);

  if (loading) return <Loader />;

  const { getMyNotes : { notes } } = data

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
          <NoteMenu list={data} action={setActiveNote} />
        </Column>
        <Column attr={"is-9"}>
          <MyEditor activeNote={activeNote}/>
        </Column>
      </Column>
    </>
  );
}

export default Notes;
