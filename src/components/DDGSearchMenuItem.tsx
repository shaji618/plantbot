import { Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import { FC } from 'react';
import DDGLogo from '../svg/duckduckgo.svg';

const DDGSearchMenuItem: FC<{ plantName?: string }> = ({ plantName }) => {
  return (
    <Conversation
      name='DuckDuckGo'
      info={plantName ? `Verify ${plantName}` : 'Search DuckDuckGo'}
      onClick={() => {
        window.open(
          `https://www.duckduckgo.org/${!!plantName ? `?q=${plantName}` : ''}`
        );
      }}
    >
      <Avatar src={DDGLogo} />
    </Conversation>
  );
};

export default DDGSearchMenuItem;
