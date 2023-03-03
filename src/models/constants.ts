export type Language = 'Russian';

export const Concepts = ['Accusative', 'Dative', "Prepositional", "Instrumental", "Genitive"] as const;

export type Concept = typeof Concepts[number]