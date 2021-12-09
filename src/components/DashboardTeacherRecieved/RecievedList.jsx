import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
//import FolderIcon from '../../assets/images/banner.png';
import DeleteIcon from "@mui/icons-material/Delete";
import './style.scss';
function generate(element) {
  return [0, 1, 2,3,4,5].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default function RecievedList() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <FormGroup row></FormGroup>
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2}} variant="h6" component="div">
          تاریخچه دریافت ها
        </Typography>
        <Demo>
          <List>
            {generate(
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary="دوره نقاشی مبتدی 01" />
                <ListItemText primary="مبلغ 500000 تومان" />
                <ListItemText primary="در تاریخ 10/10" />
                <ListItemAvatar className='mgRight'>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            )}
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
