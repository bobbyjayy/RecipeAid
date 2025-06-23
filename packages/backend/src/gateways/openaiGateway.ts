import OpenAI from "openai";
import { OpenAIGateway } from "../interfaces/OpenAIGateway";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const openaiGateway: OpenAIGateway = {
  async getMealSuggestion(prompt: string) {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    });
    return completion.choices[0].message?.content?.trim() ?? "";
  },
};
