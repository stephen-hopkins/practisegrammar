import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import useGenerate from "@/hooks/useGenerate";

function Practice() {

  const [word, setWord] = useState('');
  const [showTrans, setShowTrans] = useState(false);
  const generate = useGenerate();

  const onSubmit = () => {
    setShowTrans(false);
    generate.mutate(word);
  }

  const english = generate.isSuccess && generate.data.english;
  const russian = generate.isSuccess && generate.data.russian;

  return (
    <div className="flex flex-column align-items-center">
      <div>
        <InputText value={word} onChange={e => setWord(e.target.value)} />
        <Button className="ml-4" onClick={onSubmit}>Generate</Button>
      </div>
      <div className="mt-6 text-4xl">{english}</div>
      <Button className="mt-4" onClick={() => setShowTrans(true)}>Reveal</Button>
      <div className={classNames("mt-4 text-4xl", {hidden: !showTrans})}>{russian}</div>
    </div>
  );
}

export default Practice;