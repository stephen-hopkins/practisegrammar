"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Concept, Concepts } from "@/src/models/constants";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import SpeechBubble from "../SpeechBubble/SpeechBubble";
import useGenerate from "@/src/hooks/useGenerate";

function Practice() {
  console.log(" in practice");
  const [concept, setConcept] = useState(undefined as Concept | undefined);
  const [word, setWord] = useState("");
  const [showTrans, setShowTrans] = useState(false);
  const generate = useGenerate();

  const onSubmit = () => {
    if (word && concept) {
      setShowTrans(false);
      generate.mutate({ concept, word });
    }
  };

  const english = generate.isSuccess && generate.data.english;
  const russian = generate.isSuccess && generate.data.russian;

  const toggleShowTrans = () => {
    setShowTrans(!showTrans);
  };

  return (
    <div className="grid">
      <div className="col-12 flex justify-content-center">
        <p className="m-0">Which case would you like to practice?</p>
      </div>
      <div className="col-12 flex justify-content-center">
        <Dropdown
          placeholder="Select a case"
          className="w-auto"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          options={[...Concepts]}
          data-testid="concept-dropdown"
        />
      </div>
      <div className="col-12 flex justify-content-center">
        <p className="m-0">Which word should be included?</p>
      </div>
      <div className="col-12 flex justify-content-center">
        <InputText className="" value={word} onChange={(e) => setWord(e.target.value)} placeholder="word to practice" />
      </div>
      <div className="col-12 flex justify-content-center">
        <Button className="mt-2" onClick={onSubmit}>
          Generate
        </Button>
      </div>
      {generate.isLoading && <ProgressSpinner className="mt-4" />}
      <div className="col-12 flex justify-content-center">
        <SpeechBubble text={english ? english : ""} type="original" show={!!english} onClick={toggleShowTrans} />
      </div>
      <div className="col-12 flex justify-content-center">
        <SpeechBubble text={russian ? russian : ""} type="translated" show={showTrans} onClick={toggleShowTrans} />
      </div>
    </div>
  );
}

export default Practice;
