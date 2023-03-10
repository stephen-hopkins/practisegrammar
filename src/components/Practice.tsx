import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import useGenerate from "@/src/hooks/useGenerate";
import {Concept, Concepts} from "@/src/models/constants";
import {Dropdown} from "primereact/dropdown";
import {ProgressSpinner} from "primereact/progressspinner";

function Practice() {

  const [concept, setConcept] = useState('Accusative' as Concept)
  const [word, setWord] = useState('');
  const [showTrans, setShowTrans] = useState(false);
  const generate = useGenerate();

  const onSubmit = () => {
    setShowTrans(false);
    generate.mutate({concept, word});
  }

  const english = generate.isSuccess && generate.data.english;
  const russian = generate.isSuccess && generate.data.russian;

  return (
    <div className="flex flex-column align-items-center">
      <Dropdown value={concept} onChange={e => setConcept(e.target.value)} options={[...Concepts]}/>
      <InputText className="mt-4" value={word} onChange={e => setWord(e.target.value)}/>
      <Button className="mt-4" onClick={onSubmit}>Generate</Button>
      {generate.isLoading && <ProgressSpinner className="mt-4" />}
      <div className="mt-6 text-4xl">{english}</div>
      <Button className={classNames("mt-4", {hidden: !generate.isSuccess})} onClick={() => setShowTrans(true)}>Reveal</Button>
      <div className={classNames("mt-4 text-4xl", {hidden: !showTrans})}>{russian}</div>
    </div>
  );
}

export default Practice;