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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { withRouter } from 'react-router-dom';

import './style.scss';

const cacheRtl = createCache({
  key: 'muirtl',

  stylisPlugins: [rtlPlugin],

  prepend: true,
});

const drawerWidth = 310;

function BaseDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
            <ListItem button key={item.text} onClick={item.onClick} className="list-item">
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
    <CacheProvider value={cacheRtl}>
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
                anchor="left"
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
              >
                <div className={props.className}>{drawer}</div>
              </Drawer>
            </Box>
          </Grid>
          <Grid item>
            <AppBar
              position="fixed"
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
                  sx={{ mr: 2, display: useMediaQuery('(max-width: 600px)') ? 'block' : 'none' }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Responsive drawer
                </Typography>
              </Toolbar>
            </AppBar>

            {props.children}
          </Grid>
        </Grid>
      </Box>
    </CacheProvider>
  );
}

export default withRouter(BaseDashboard);
