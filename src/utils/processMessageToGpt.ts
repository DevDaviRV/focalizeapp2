import { MessageProps } from "@/pages/app/chat/Chat";

const apiKey = "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"

const processMessageToGpt = async (chatMessage: MessageProps, userName: string): Promise<string> => {
  let role = "";
  if (chatMessage.sender === "assistant") {
    role = "assistant"; 
  } else {
    role = "user";
  }

  const systemMessage = {
    role: "system",
    content: `você é um assistente de produtividade do ${userName}. Trate essa pessoa como se ela fosse o seu chefe e você vai nos ajudar a resolver esse tipo de problema.`
  };

  console.log(`systemMessage =>`, systemMessage);

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      systemMessage,
      { role, content: chatMessage.message },
    ],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};

export { processMessageToGpt };
