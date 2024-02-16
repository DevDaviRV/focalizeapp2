import { useState } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.css";
import "./myStyle.css"
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, MessageModel, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { processMessageToGpt } from '@/utils/processMessageToGpt';
import { useAuthContext } from '@/hooks/useAuthContext';

export type MessageProps = MessageModel;

export function Chat() {
  const [typing, setTyping] = useState(false);
  const { user } = useAuthContext();
  const userName = user?.displayName || "";
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      message: "Olá, tudo bem ?",
      sender: "assistant",
      direction: "incoming",
      position: "normal"
    }
  ]);

  const handleSend = async (message: string) => {
    const newMessage: MessageProps = {
      message: message,
      sender: "user",
      direction: "outgoing",
      position: "normal"
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
    ]);

    setTyping(true);

    try {
      const responseFromGpt = await processMessageToGpt(newMessage, userName);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "assistant",
          message: responseFromGpt,
          direction: "incoming",
          position: "normal",
        },
      ]);
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
    }

    setTyping(false);
  }

  return (
    <div className='h-screen'>
      <MainContainer >
        <ChatContainer>
          <MessageList
            style={{ background: "#0E0E11" }}
            scrollBehavior='smooth'
            typingIndicator={typing ? <TypingIndicator content={"Aguarde alguns segundos. O seu funcionário está digitando..."} /> : null}
          >
            {messages.map((message, index) => (
              <Message key={index} model={message} style={{marginTop:"12px"}}/>
            ))}
          </MessageList>
          <MessageInput placeholder='Insira sua mensagem aqui' onSend={handleSend} style={{ background: "#0E0E11" }} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
