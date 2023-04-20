import {Concept, Language} from "./constants"

export type Translation = {
  [key: Language]: string
}

export type SentenceInfo = {
  language: Language,
  concept: Concept,
  word: string,
}

export type Sentence = SentenceInfo & {
  translations: Translation[]
}