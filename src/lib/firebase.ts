import { initializeApp } from "firebase/app";
import { Concept, Language } from "@/src/models/constants";
import { addDoc, collection, CollectionReference, getDocs, getFirestore, query, where } from "@firebase/firestore";
import { Sentence, SentenceInfo } from "@/src/models/translation";

const firebaseConfig = {
  apiKey: "AIzaSyCXVeg1hzBtWVW2FK9_cz7r7gygHIH8E2k",
  authDomain: "practisegrammar.firebaseapp.com",
  projectId: "practisegrammar",
  storageBucket: "practisegrammar.appspot.com",
  messagingSenderId: "666711626320",
  appId: "1:666711626320:web:410a88534639301d4b7755",
  measurementId: "G-YCLPJ0Z093",
};

function getDb() {
  // const analytics = getAnalytics(app);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    sentences: collection(db, "sentences") as CollectionReference<SentenceInfo>,
  };
}

export async function getSentence(language: Language, concept: Concept, word: string) {
  const { sentences } = getDb();
  const q = query(
    sentences,
    where("language", "==", language),
    where("concept", "==", concept),
    where("word", "==", word)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  }
}

export async function addSentence(sentence: Sentence) {
  const { translations, ...metaData } = sentence;
  const { sentences } = getDb();
  //const doc = await addDoc(sentences, metaData, "translations", translations);
  //await addDoc(collection(sentences, doc.id, "translations"), translations);
}
