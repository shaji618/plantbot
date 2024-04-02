import { Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import { FC, useEffect, useState } from 'react';
import CameraIcon from '../svg/camera-icon.svg';
import Drawer from '@mui/material/Drawer';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import LoadingGif from '../images/loading.gif';
import Box from '@mui/material/Box';

interface CommonProps {
  plantName?: string;
}

const DrawerContent: FC<CommonProps> = ({ plantName }) => {
  const [imgUrlArray, setImgUrlArray] = useState<string[]>(['']);
  const [requestLoading, setRequestLoading] = useState(true);
  useEffect(() => {
    if (!plantName) return;

    const fetchWikimediaUrls = async () => {
      let photoUrls: string[] = [];
      const photosRequest = await fetch(
        `https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=${encodeURIComponent(
          plantName
        )}&limit=100`,
        { method: 'GET' }
      );
      const photosJson = await photosRequest.json();
      const urls = [...photosJson.pages].map((page) => {
        if (!page.thumbnail || !page.thumbnail.url) return;
        return page.thumbnail.url;
      });
      urls.forEach((url) => {
        if (url) {
          photoUrls.push('https:' + url.replace(/\d+px/g, '600px'));
        }
      });
      setImgUrlArray(photoUrls);
      setRequestLoading(false);
    };

    if (!!plantName) {
      fetchWikimediaUrls();
    }
  }, [plantName]);
  if (requestLoading) {
    return (
      <Box
        component='img'
        src={LoadingGif}
        sx={{
          height: 256,
          margin: 'auto',
          width: 256
        }}
      />
    );
  } else if (!plantName) {
    return (
      <p style={{ fontSize: '2rem', textAlign: 'center' }}>
        I'm not yet sure what plant you're searching for!
      </p>
    );
  } else {
    return (
      <ImageList cols={5} sx={{ maxHeight: '80vh' }}>
        {imgUrlArray.map((imgUrl, index) => {
          return (
            !!imgUrl && (
              <ImageListItem key={index}>
                <img src={imgUrl} alt={index.toString()} />
              </ImageListItem>
            )
          );
        })}
      </ImageList>
    );
  }
};

const PhotoMenu: FC<CommonProps> = ({ plantName }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <>
      <Conversation
        name='Photos'
        info={plantName || 'Unknown plant'}
        onClick={toggleDrawer(true)}
      >
        <Avatar src={CameraIcon} />
      </Conversation>
      <Drawer anchor='bottom' onClose={toggleDrawer(false)} open={drawerOpen}>
        <DrawerContent plantName={plantName} />
      </Drawer>
    </>
  );
};

export default PhotoMenu;
