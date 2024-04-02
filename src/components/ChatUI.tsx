import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import './ChatUI.css';
import {
  MainContainer,
  Avatar,
  ChatContainer,
  Message,
  MessageInput,
  TypingIndicator,
  MessageList,
  MessageGroup,
  Sidebar,
  ConversationList,
  Button,
  Conversation,
} from '@chatscope/chat-ui-kit-react';
import MindfulMDMomLogo from '../images/mindful-md-mom-logo.jpg';
import RobotIcon from '../svg/bot-assistant.svg';
import { getImgTagsFromString } from '../util/htmlStrings';
import PhotoMenu from './PhotoMenu';
import WikipediaMenuItem from './WikipediaMenuItem';
import PlantMapsMenuItem from './PlantMapsMenuItem';
import ShoppingMenu from './ShoppingMenu';
import DDGSearchMenuItem from './DDGSearchMenuItem';
import PlantNetLogo from '../images/plantnet-logo.png';
import {
  doChatCompletion,
  introMessage,
  systemPrompt,
} from '../util/apiRequests';

type OllamaRole = 'assistant' | 'system' | 'user';

interface OllamaMessage {
  role: OllamaRole;
  content: string;
  isImageArray?: boolean;
}

const ChatUI: FC = () => {
  const [messageInputValue, setMessageInputValue] = useState('');
  const [messages, setMessages] = useState<OllamaMessage[]>([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const [extractedPlantName, setExtractedPlantName] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const introMessages = [systemPrompt, introMessage];
    setMessages(introMessages);
    doChatCompletion(introMessages);
  }, []);

  const handleSubmit = async () => {
    const userSubmission: OllamaMessage = {
      role: 'user',
      content: messageInputValue,
    };

    setMessageInputValue('');
    setMessages([systemPrompt, ...messages, userSubmission]);

    setRequestLoading(true);
    const responseJson = await doChatCompletion([
      systemPrompt,
      ...messages,
      userSubmission,
    ]);

    let streamedMessage: OllamaMessage = {
      role: 'assistant',
      content: responseJson.message.content,
    };

    if (/scientific name:/gi.test(responseJson.message.content)) {
      const matches = /scientific name: (.*)[!]/gi.exec(
        responseJson.message.content
      );
      const extractedPlantScientificName = matches?.at(-1);
      if (extractedPlantScientificName) {
        setExtractedPlantName(
          extractedPlantScientificName
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
        );
      }
      streamedMessage = {
        role: 'assistant',
        content: `${responseJson.message.content}\n\nCheck out the updated links in the sidebar! 🌱🌿🌵`,
      };
      setRequestLoading(false);
    }

    setMessages((prevMessages) => [...prevMessages, streamedMessage]);
    setRequestLoading(false);

    setRequestLoading(false);
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <MainContainer responsive style={{ width: '60vw' }}>
      <Sidebar position="left" scrollable style={{ maxWidth: '16vw' }}>
        <ConversationList>
          <h3 style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.4)' }}>
            Links
          </h3>
          <PlantMapsMenuItem />
          <Conversation
            name="Pl@ntNet"
            info="Classify image"
            onClick={() => {}}
          >
            <Avatar src={PlantNetLogo} />
          </Conversation>
          <ShoppingMenu plantName={extractedPlantName} />
          <DDGSearchMenuItem plantName={extractedPlantName} />
          <WikipediaMenuItem plantName={extractedPlantName} />
          {extractedPlantName && (
            <>
              <PhotoMenu plantName={extractedPlantName} />
            </>
          )}
        </ConversationList>
        <ConversationList style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'rgba(0, 0, 0, 0.4)' }}>Tools</h3>
          <Button>Make me a gif!</Button>
          <Button>Tell me a story</Button>
          <Button>Clear conversation</Button>
        </ConversationList>
      </Sidebar>
      <ChatContainer>
        <MessageList
          typingIndicator={
            requestLoading && <TypingIndicator content="PlantBot is thinking" />
          }
        >
          {messages.map((message, index): ReactNode => {
            if (message.role !== 'system' && message.content) {
              return !message.isImageArray ? (
                <MessageGroup
                  key={index}
                  direction={
                    message.role === 'assistant' ? 'incoming' : 'outgoing'
                  }
                  sender={message.role === 'assistant' ? 'PlantBot' : 'You'}
                >
                  <Avatar
                    src={
                      message.role === 'assistant'
                        ? RobotIcon
                        : MindfulMDMomLogo
                    }
                    name={message.role === 'assistant' ? 'PlantBot' : 'You'}
                  />
                  <MessageGroup.Messages>
                    <Message
                      model={{
                        message: message.content,
                        direction:
                          message.role === 'assistant'
                            ? 'incoming'
                            : 'outgoing',
                        position: 'normal',
                      }}
                    />
                  </MessageGroup.Messages>
                </MessageGroup>
              ) : (
                <MessageGroup
                  key={index}
                  direction={'incoming'}
                  sender={'PlantBot'}
                >
                  <Avatar src={RobotIcon} name={'PlantBot'} />
                  <MessageGroup.Messages>
                    <Message
                      model={{
                        direction: 'incoming',
                        position: 'normal',
                      }}
                    >
                      <Message.HtmlContent
                        html={`<p>I found some images for you!</p>${getImgTagsFromString(
                          message.content
                        )}`}
                      />
                    </Message>
                  </MessageGroup.Messages>
                </MessageGroup>
              );
            }
          })}
        </MessageList>
        <MessageInput
          ref={inputRef}
          disabled={requestLoading}
          placeholder="Continue the conversation"
          attachButton={false}
          value={messageInputValue}
          onChange={(val) => setMessageInputValue(val)}
          onSend={handleSubmit}
          autoFocus={!requestLoading}
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatUI;
