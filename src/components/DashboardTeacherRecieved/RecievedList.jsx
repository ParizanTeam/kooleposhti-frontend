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
import { convertNumberToPersian ,formatPrice} from '../../utils/helpers';
import { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axiosConfig';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import { useMobile } from '../../utils/detectSource';
import './style.scss';

function Generate(element) {
  if (element) {
    var myDate = new Date(element.date); 
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
        <div style={{width:'130px',marginRight: '15px',textAlign:'right'}}>
        <ListItemText primary={element.course} sx={{margin:'auto',justifyContent:'center'}}/></div>
        <div style={{width:'130px',marginRight: '30px',marginLeft: '2px',textAlign:'center'}}>
        <ListItemText primary={element.student} sx={{margin:'auto',justifyContent:'center'}}/></div>
        
        <ListItemText primary={convertNumberToPersian(` ${formatPrice(element.amount)} تومان `)}/>
        <ListItemText sx={{ marginLeft: '5px' }} primary={convertNumberToPersian(` در تاریخ ${(myDate.getFullYear())}/${(myDate.getMonth())}/${(myDate.getDate())}`)} />
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
          <List>{tansferHistory && tansferHistory.map(item => Generate(item))}</List>
        </Demo>
      </Grid>
    </Box>
  );
}
