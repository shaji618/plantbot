import {
  Conversation,
  Avatar as ChatUIKitAvatar,
} from '@chatscope/chat-ui-kit-react';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import MUIAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { FC, useState } from 'react';
import ShoppingCartIcon from '../svg/shopping-cart.svg';
import Stack from '@mui/material/Stack';
import HomeDepotLogo from '../svg/home-depot-logo.svg';
import LowesLogo from '../svg/lowes-logo.svg';
import IconButton from '@mui/material/IconButton';
import TheSillLogo from '../images/the-sill-logo.jpg';
import BloomscapeLogo from '../images/bloomscape-logo.png';
import HouseplantShopLogo from '../images/houseplant-shop-logo.jpg';
import NatureHillsLogo from '../images/nature-hills-logo.jpg';
import WalmartLogo from '../images/walmart-logo.jpg';
import EvergreenLogo from '../images/evergreen-logo.png';

type Shop = {
  icon: string;
  name: string;
  getSearchUrl: (plantName: string) => string;
  shouldOpenNewTab: boolean;
};

const Shops: { [key: string]: Shop } = {
  BLOOMSCAPE: {
    icon: BloomscapeLogo,
    name: 'Bloomscape',
    getSearchUrl: (plantName: string): string => {
      return `https://bloomscape.com/${plantName && `?s=${plantName}`}`;
    },
    shouldOpenNewTab: true,
  },
  EVERGREEN: {
    icon: EvergreenLogo,
    name: 'Evergreen',
    getSearchUrl: () => 'https://evergreenofjc.com/',
    shouldOpenNewTab: false,
  },
  HOME_DEPOT: {
    icon: HomeDepotLogo,
    name: 'The Home Depot',
    getSearchUrl: (plantName: string): string => {
      return `https://www.homedepot.com/${
        plantName &&
        `b/Pick-Up-Today/N-5yc1vZ1z175a5/Ntk-elasticplus/Ntt-${plantName}?NCNI-5&sortby=bestmatch&sortorder=none`
      }`;
    },
    shouldOpenNewTab: false,
  },
  HOUSEPLANT_SHOP: {
    icon: HouseplantShopLogo,
    name: 'House Plant Shop',
    getSearchUrl: (plantName: string): string => {
      return `https://houseplantshop.com/${
        plantName && `search?type=article%252Cpage%252Cproduct&q=${plantName}`
      }`;
    },
    shouldOpenNewTab: true,
  },
  LOWES: {
    name: "Lowe's",
    icon: LowesLogo,
    getSearchUrl: (plantName: string): string => {
      return `https://www.lowes.com/${
        plantName && `search?searchTerm=${plantName}&inStock=1&rollUpVariants=0`
      }`;
    },
    shouldOpenNewTab: true,
  },
  NATURE_HILLS: {
    icon: NatureHillsLogo,
    name: 'Nature Hills',
    getSearchUrl: (plantName: string): string => {
      return `https://www.naturehills.com/${
        plantName && `search/?q=${plantName}`
      }`;
    },
    shouldOpenNewTab: true,
  },
  THE_SILL: {
    icon: TheSillLogo,
    name: 'The Sill',
    getSearchUrl: (plantName: string): string => {
      return `https://www.thesill.com/${plantName && `search?q=${plantName}`}`;
    },
    shouldOpenNewTab: false,
  },
  WALMART: {
    icon: WalmartLogo,
    name: 'Walmart',
    getSearchUrl: (plantName: string): string => {
      return `https://www.walmart.com/${
        plantName &&
        `search?q=${plantName}&facet=fulfillment_method_in_store%3AIn-store`
      }`;
    },
    shouldOpenNewTab: false,
  },
};

const MenuItem: FC<{
  shop: Shop;
  onClick: (shop?: Shop) => void;
}> = ({ shop, onClick }) => {
  return (
    <>
      <Box
        onClick={() => {
          onClick(shop);
        }}
        sx={{ cursor: 'pointer' }}
      >
        <Stack direction="row">
          <IconButton sx={{ maxWidth: 36 }}>
            <MUIAvatar src={shop.icon} sx={{ border: 1 }} />
          </IconButton>
          <Box ml={2} mt={1}>
            <p>{shop.name}</p>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

const DrawerContent: FC<{ plantName?: string }> = ({ plantName }) => {
  const [selectedItem, setSelectedItem] = useState<Shop>();
  return (
    <Grid bgcolor="#AAF0C1" container spacing={1}>
      <Grid item xs={2}>
        <Stack ml={2} spacing={2}>
          <MenuItem
            shop={Shops.BLOOMSCAPE}
            onClick={() => {
              setSelectedItem(undefined);
              window.open(Shops.BLOOMSCAPE.getSearchUrl(plantName || ''));
            }}
          />
          <MenuItem shop={Shops.EVERGREEN} onClick={setSelectedItem} />
          <MenuItem shop={Shops.HOME_DEPOT} onClick={setSelectedItem} />
          <MenuItem
            shop={Shops.HOUSEPLANT_SHOP}
            onClick={() => {
              setSelectedItem(undefined);
              window.open(Shops.HOUSEPLANT_SHOP.getSearchUrl(plantName || ''));
            }}
          />
          <MenuItem
            shop={Shops.LOWES}
            onClick={() => {
              setSelectedItem(undefined);
              window.open(Shops.LOWES.getSearchUrl(plantName || ''));
            }}
          />
          <MenuItem
            shop={Shops.NATURE_HILLS}
            onClick={() => {
              setSelectedItem(undefined);
              window.open(Shops.NATURE_HILLS.getSearchUrl(plantName || ''));
            }}
          />
          <MenuItem shop={Shops.THE_SILL} onClick={setSelectedItem} />
          <MenuItem
            shop={Shops.WALMART}
            onClick={() => {
              setSelectedItem(undefined);
              window.open(Shops.WALMART.getSearchUrl(plantName || ''));
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={10}>
        {selectedItem && !selectedItem.shouldOpenNewTab && (
          <iframe
            src={selectedItem?.getSearchUrl(plantName || '')}
            style={{ height: 800, width: '100%' }}
            title={selectedItem.name}
          />
        )}
      </Grid>
    </Grid>
  );
};

const ShoppingMenu: FC<{ plantName?: string }> = ({ plantName }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <>
      <Conversation
        name="Shop"
        info={`Find ${plantName || '🌱🌿🌵'}`}
        onClick={toggleDrawer(true)}
      >
        <ChatUIKitAvatar src={ShoppingCartIcon} />
      </Conversation>
      <Drawer anchor="bottom" onClose={toggleDrawer(false)} open={drawerOpen}>
        <DrawerContent plantName={plantName} />
      </Drawer>
    </>
  );
};

export default ShoppingMenu;
