import { useMutation } from "@tanstack/react-query";
import { Translation } from "@/src/models/translation";
import { Concept } from "@/src/models/constants";

type useGenerateInput = {
  concept: Concept;
  word: string;
};

function useGenerate() {
  return useMutation(async ({ concept, word }: useGenerateInput) => {
    const response = await fetch(`/api/sentences/Russian/${concept}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word,
      }),
    });
    const trans = await response.json();
    return trans as Translation;
  });
}

export default useGenerate;
