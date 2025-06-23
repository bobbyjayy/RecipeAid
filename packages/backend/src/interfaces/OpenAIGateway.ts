export interface OpenAIGateway {
  getMealSuggestion(prompt: string): Promise<string>;
}
