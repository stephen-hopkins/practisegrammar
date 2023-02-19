import {useMutation} from "@tanstack/react-query";
import {Translation} from "@/pages/api/generate";


function useGenerate() {
  return useMutation(async (word: string) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        word
      })
    });
    const trans = await response.json();
    return trans as Translation;
  })
}

export default useGenerate;