import { Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import { Drawer } from '@mui/material';
import { FC, useState } from 'react';
import WikipediaIcon from '../svg/wikipedia-logo.svg';

const WikipediaMenuItem: FC<{ plantName?: string }> = ({ plantName }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <>
      <Conversation
        name="Wikipedia"
        info={`Search ${plantName || 'Wikipedia'}`}
        onClick={toggleDrawer(true)}
      >
        <Avatar src={WikipediaIcon} />
      </Conversation>
      <Drawer anchor="bottom" onClose={toggleDrawer(false)} open={drawerOpen}>
        {
          <iframe
            src={`https://www.wikipedia.org/${
              !!plantName ? `wiki/${plantName}` : ''
            }`}
            title={plantName}
            style={{ height: '80vh', maxHeight: '800px' }}
          />
        }
      </Drawer>
    </>
  );
};

export default WikipediaMenuItem;
