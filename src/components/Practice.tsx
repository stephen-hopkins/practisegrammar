import React, { useMemo, useState } from "react";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import useGenerate from "@/src/hooks/useGenerate";
import { Concept, Concepts } from "@/src/models/constants";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { capitalise } from "@/src/lib/capitalise";
import SpeechBubble from "./SpeechBubble";

function Practice() {
  const [concept, setConcept] = useState("Accusative" as Concept);
  const [word, setWord] = useState("");
  const [showTrans, setShowTrans] = useState(false);
  const generate = useGenerate();

  const onSubmit = () => {
    setShowTrans(false);
    generate.mutate({ concept, word });
  };

  const english = generate.isSuccess && generate.data.english;
  const russian = generate.isSuccess && generate.data.russian;

  const conceptOptions = useMemo(() => {
    return Concepts.map((c) => {
      return {
        label: capitalise(c),
        value: c,
      };
    });
  }, []);

  return (
    <div className="flex flex-column align-items-center">
      <Dropdown value={concept} onChange={(e) => setConcept(e.target.value)} options={conceptOptions} />
      <InputText className="mt-4" value={word} onChange={(e) => setWord(e.target.value)} />
      <Button className="mt-4" onClick={onSubmit}>
        Generate
      </Button>
      {generate.isLoading && <ProgressSpinner className="mt-4" />}
      <SpeechBubble text={english ? english : ""} type="original" show={!!english} />
      <Button className={classNames("mt-4", { hidden: !generate.isSuccess })} onClick={() => setShowTrans(true)}>
        Reveal
      </Button>
      <SpeechBubble text={russian ? russian : ""} type="translated" show={showTrans} />
    </div>
  );
}

export default Practice;
