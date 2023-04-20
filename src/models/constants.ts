export const Languages = ["english", "russian"];
export type Language = typeof Languages[number];

export const Concepts = ['accusative', 'dative', "prepositional", "instrumental", "genitive"] as const;

export type Concept = typeof Concepts[number]