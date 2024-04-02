import { Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import { Drawer } from '@mui/material';
import { FC, useState } from 'react';
import USMap from '../images/us-hardiness-zones.png';

const PlantMapsMenuItem: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <>
      <Conversation
        name="PlantMaps"
        info="Hardiness zone and climate"
        onClick={toggleDrawer(true)}
      >
        <Avatar src={USMap} />
      </Conversation>
      <Drawer anchor="bottom" onClose={toggleDrawer(false)} open={drawerOpen}>
        (
        <iframe
          title="PlantMaps"
          src="https://www.plantmaps.com/37604"
          style={{ height: '80vh', maxHeight: '800px' }}
        />
        )
      </Drawer>
    </>
  );
};

export default PlantMapsMenuItem;
