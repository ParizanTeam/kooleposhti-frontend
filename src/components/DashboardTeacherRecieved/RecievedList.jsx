import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
//import FolderIcon from "@mui/icons-material/Folder";
import FolderIcon from '../../assets/images/banner.png';
import { convertNumberToPersian } from '../../utils/helpers';
import { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axiosConfig';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import './style.scss';

function generate(element) {
  if (element) {
    return (
      <ListItem
        sx={{ backgroundColor: 'rgb(165, 247, 226)', marginBottom: '8px', borderRadius: '5px', padding: '6px' }}
      >
        {/*secondaryAction={*/}
        {/*} <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
            </IconButton>*/}
        <ListItemAvatar>
          <Avatar src={FolderIcon} alt="recievedList" />
          {/*    <FolderIcon />
                  </Avatar>*/}
        </ListItemAvatar>
        <ListItemText primary={element.course} />
        <ListItemText primary={element.username} />
        <ListItemText className="mgRight" primary="مبلغ" />
        <ListItemText primary={convertNumberToPersian(`${element.amount}`)} />
        <ListItemText primary="تومان" />
        <ListItemText className="mgRight" primary="در تاریخ" />
        <ListItemText sx={{ marginLeft: '5px' }} primary={convertNumberToPersian(`${element.date}`)} />
        <ListItemText className="mgRight" primary="به کیف شما واریز نمود" />
      </ListItem>
    );
  }
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function RecievedList() {
  const [tansferHistory, setTansferHistory] = useState(null);
  const [diagramData, setDiagramData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/accounts/instructors/orders/`)
      .then(res => {
        setTansferHistory(res.data);
        console.log('TansferHistory', res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup row></FormGroup>
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          تاریخچه دریافت ها
        </Typography>
        <Demo>
          <List>{tansferHistory && tansferHistory.map(item => generate(item))}</List>
        </Demo>
      </Grid>
    </Box>
  );
}
