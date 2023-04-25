import React, { useMemo, useState } from "react";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import useGenerate from "@/src/hooks/useGenerate";
import { Concept, Concepts } from "@/src/models/constants";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { capitalise } from "@/src/lib/capitalise";
import SpeechBubble from "./SpeechBubble/SpeechBubble";

function Practice() {
  const [concept, setConcept] = useState("accusative" as Concept);
  const [word, setWord] = useState("");
  const [showTrans, setShowTrans] = useState(false);
  const generate = useGenerate();

  const onSubmit = () => {
    setShowTrans(false);
    generate.mutate({ concept, word });
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
          className="w-auto"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          options={[...Concepts]}
        />
      </div>
      <p className="col-12 ml-auto m-0">Which word?</p>
      <div className="col-12 flex justify-content-end">
        <InputText className="" value={word} onChange={(e) => setWord(e.target.value)} />
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
