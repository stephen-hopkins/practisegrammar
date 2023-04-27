import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Concept, Concepts } from "@/src/models/constants";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import SpeechBubble from "../SpeechBubble/SpeechBubble";
import useGenerate from "@/src/hooks/useGenerate";

function Practice() {
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
      <p className="col-12 m-0">Which case would you like to practice?</p>
      <div className="col-12 flex justify-content-end">
        <Dropdown
          placeholder="Select a case"
          className="w-auto"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          options={[...Concepts]}
          data-testid="concept-dropdown"
        />
      </div>
      <p className="col-12 ml-auto m-0">Which word should be included?</p>
      <div className="col-12 flex justify-content-end">
        <InputText className="" value={word} onChange={(e) => setWord(e.target.value)} placeholder="word to practice" />
      </div>
      <div className="col-12 flex justify-content-center">
        <Button className="mt-2" onClick={onSubmit}>
          Generate
        </Button>
      </div>
      {generate.isLoading && <ProgressSpinner className="mt-4" />}
      <SpeechBubble
        className="col-12"
        text={english ? english : ""}
        type="original"
        show={!!english}
        onClick={toggleShowTrans}
      />
      <SpeechBubble
        className="col-12"
        text={russian ? russian : ""}
        type="translated"
        show={showTrans}
        onClick={toggleShowTrans}
      />
    </div>
  );
}

export default Practice;
