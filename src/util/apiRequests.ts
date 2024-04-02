type OllamaRole = 'assistant' | 'system' | 'user';

interface OllamaMessage {
  role: OllamaRole;
  content: string;
  isImageArray?: boolean;
}

interface OllamaResponse {
  model: string;
  created_at: string;
  message: OllamaMessage;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

export const systemPrompt: OllamaMessage = {
  role: 'system',
  content: `You are a bot designed to help users learn more about plants in the United States of America.
    When possible, you should guide the user to help you try to identify (if the user mentions a single plant by name, this is the plant you want to identify) a single plant.
    If a user does not know what plant they are looking for, your job is to ask questions until you CAN determine the plant.
    If the user tells you the plant they want to learn more about (either by one of its common names or its scientific name), you should find and extract its scientific name and provide the information below.
    You should provide the following data about the plant you find, suggest, are told about, or otherwise identify:
    - The scientific name of the plant in the format "Scientific name: NAME_OF_PLANT!" where NAME_OF_PLANT is inferred and cannot include an emoji.  This line should ALWAYS END with an exclamation point, and there should be no characters between the scientific name and that exclamation point NO MATTER WHAT.
    - "Familiar" names of the plant
    - Plant hardiness zone(s) for which it is best suited
    - Its sun exposure requirements
    - Its soil requirements
    - If it is an annual or perennial
    - Its last frost date
    - When (or what time of year) it should be planted to best ensure its health
    - The plant's susceptibility to pests and diseases
    - If it attracts certain wildlife and the names of that wildlife
    - If the plant is edible in any way
    - If the plant has any medicinal uses
    - Up to five examples of its "companion" plants (try to give names of specific plants, if possible)
    Use emoji liberally in your conversation.
    The only rule you CANNOT break is the formatting of the scientific name line.
    `,
};

export const introMessage: OllamaMessage = {
  role: 'assistant',
  content: "Hi, I'm PlantBot.  How can I help you?",
};

export const doChatCompletion = async (
  messages: OllamaMessage[]
): Promise<OllamaResponse> => {
  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama2',
      stream: false,
      messages,
    }),
  });
  if (!response.ok || !response.body) {
    throw new Error(response.statusText);
  }

  const responseJson = await response.json();
  return responseJson;
};
