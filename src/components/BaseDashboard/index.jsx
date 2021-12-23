import * as React from 'react';
import {
  CssBaseline,
  AppBar,
  IconButton,
  Typography,
  ListItemIcon,
  ListItem,
  List,
  Toolbar,
  Box,
  Divider,
  Drawer,
  Grid,
  useMediaQuery,
  Button,
  Container,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Wallet from '@mui/icons-material/AccountBalanceWallet';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

import './style.scss';

const cacheRtl = createCache({
  key: 'muirtl',

  stylisPlugins: [rtlPlugin],

  prepend: true,
});

const drawerWidth = 310;

function BaseDashboard(props) {
  const [color, setColor] = React.useState('#fd576c');
  const [openSearchBar, setOpenSearchBar] = React.useState(false);

  const handleSearchBarOpen = () => {
    setOpenSearchBar(true);
    setColor('grey');
  };

  const handleSearchBarClose = () => {
    setOpenSearchBar(false);
    setColor('#fd576c');
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const hideDrawer = () =>{
    setMobileOpen(false)
  }

  const drawer = (
    <div>
      <Typography
        component="ListItem"
        className="dashboard-sidebar-profile-title"
        variant="h6"
        sx={{ fontWeight: 'bold' }}
      >
        کوله پشتی
      </Typography>
      <Divider sx={{ background: 'rgba(255, 255, 255, 0.4);', mr: 2, ml: 2 }} />
      <Toolbar>{props.profile}</Toolbar>
      <Divider sx={{ background: 'rgba(255, 255, 255, 0.4);', mr: 2, ml: 2 }} />
      <List>
        {props.items.map((item, index) => (
          <div style={{ padding: '0px 10px' }}>
            <ListItem button key={item.text} onClick={item.onClick} className="list-item" onClickCapture={hideDrawer}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <p style={{ fontSize: '13px' }}>{item.text}</p>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Box sx={{ display: 'flex', margin: '60px 0 0 0', padding: 3 }}>
        <CssBaseline />
        <Grid container>
          <Grid item>
            <Box
              component="nav"
              sx={{ width: { md: drawerWidth, sm: '34vmin' }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { sm: 'none', xs: 'block' },
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: { sm: '33vmin', xs: drawerWidth },
                  },
                }}
                anchor="right"
              >
                <div className={props.className}>{drawer}</div>
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { sm: 'block', xs: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { md: drawerWidth, sm: '34vmin' } },
                }}
                open
                anchor="right"
              >
                <div className={props.className}>{drawer}</div>
              </Drawer>
            </Box>
          </Grid>
          <CacheProvider value={cacheRtl}>
            <Grid
              item
              sx={{ margin: 'auto', width: { md: `calc(100% - ${drawerWidth}px)`, sm: `calc(100% - 34vmin)` } }}
            >
              <AppBar
                position="fixed"
                display="flex"
                sx={{
                  width: { md: `calc(100% - ${drawerWidth}px)`, sm: `calc(100% - 34vmin)` },
                  backgroundColor: 'rgba(10, 67, 94, 0.942)',
                }}
              >
                <Toolbar>
        
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: useMediaQuery('(max-width: 600px)') ? 'block' : 'none', paddingTop:2.5 }}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Button variant="text" component={Link} to="/" sx={{ mr: 2 }}>
                    <HomeIcon sx={{ color: 'rgba(123, 234, 242, 0.857)', mr: 1.5 }} />
                    <Typography variant="body" noWrap component="div" sx={{ color: 'white', fontSize: '0.7rem' }}>
                      خانه
                    </Typography>
                  </Button>
                  <Button variant="text" component={Link} to="/Help">
                    <HelpIcon sx={{ color: 'rgba(123, 234, 242, 0.857)', mr: 1.5 }} />
                    <Typography variant="body" noWrap component="div" sx={{ color: 'white', fontSize: '0.7rem' }}>
                      راهنما
                    </Typography>
                  </Button>

                  <Box display="flex" flexGrow={1} sx={{ direction: 'rtl' }}>
                    <Button
                      variant="text"
                      href="/"
                      onClick={() => {
                        localStorage.removeItem('access_token');
                      }}
                    >
                      <LogoutIcon sx={{ color: 'rgba(123, 234, 242, 0.857)', ml: 1.5 }} />
                      <Typography variant="body" noWrap component="div" sx={{ color: 'white', fontSize: '0.7rem' }}>
                        خروج
                      </Typography>
                    </Button>
                  </Box>
             
                </Toolbar>
              </AppBar>

              {props.children}
            </Grid>
          </CacheProvider>
        </Grid>
      </Box>
    </div>
  );
}

export default withRouter(BaseDashboard);
