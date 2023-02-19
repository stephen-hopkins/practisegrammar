// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Configuration, OpenAIApi} from "openai";
import ApiError from "@/models/apiError";

export type Translation = {
  english: string,
  russian: string
}

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

  const {word} = req.body as {word: string};


  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(word),
      temperature: 0.6,
      max_tokens: 200
    });
    console.log(completion.data);
    const translation = JSON.parse(completion.data.choices[0].text as string) as Translation;
    res.status(200).json(translation)
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

function generatePrompt(word: string) {
  return `The accusative case in Russian denotes either a direct object of a verb, or direction into or onto something.

Given an example of a sentence in english and russian that uses the accusative case and the word ${word}.  Your response should be in JSON format with two parameters 'english' and 'russian'.`
}