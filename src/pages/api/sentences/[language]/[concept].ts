// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Configuration, OpenAIApi} from "openai";
import ApiError from "@/src/models/apiError";
import Translation from "@/src/models/translation";
import {Concept, Language} from "@/src/models/constants";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Translation | ApiError>
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const {language, concept} = req.query as {language: Language, concept: Concept};
  const {word} = req.body as {word: string};
  console.log(`language: ${language} concept: ${concept} word: ${word}`);

  try {

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "user", content: generatePrompt(language, concept, word)}
      ]
    })

    console.log(completion.data);
    const response = completion.data?.choices[0]?.message?.content;

    if (response) {
      res.status(200).json(JSON.parse(response));
    } else {
      res.status(502);
    }

  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(language: Language, concept: Concept, word: string) {
  if (language === 'Russian') {
    const wordInstruction = word !== '' ? `падеж со словом ${word}` : '';
    return `Напишите пример предложения, в котором используется ${caseTranslation[concept]} ${wordInstruction}.  Ваш ответ должен быть в формате JSON с двумя параметрами 'english' и 'russian'.`
  }
  return "";
}

const caseTranslation = {
  "Accusative": "винительный",
  "Dative": "дательный",
  "Prepositional": "предложный",
  "Instrumental": "инструментальный",
  "Genitive": "родительный"
} as {
  [k in Concept]: string
};
