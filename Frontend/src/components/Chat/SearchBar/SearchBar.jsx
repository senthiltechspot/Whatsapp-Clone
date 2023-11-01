import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function SearchBar({ users, handleUsers }) {
  const [state, setState] = React.useState(false);

  const list = () => (
    <Box
      sx={{ width: 330 }}
      role="presentation"
      onClick={() => setState(false)}
      onKeyDown={() => setState(false)}
    >
      <List>
        {users &&
          users.map((user, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block", cursor: "pointer" }}
              onClick={() => handleUsers(user)}
            >
              <Box className="flex items-center justify-between p-1">
                <Box className="flex items-center gap-3">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://mui.com/static/images/avatar/1.jpg"
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <ListItemText
                      primary={user.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    <Typography variant="caption" display="block" gutterBottom>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ bgcolor: "white", width: "340px" }} />
            </ListItem>
          ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <Paper
      component="form"
      sx={{
        p: "10px",
        display: "flex",
        alignItems: "center",
        width: 337,
        backgroundColor: "rgb(32, 44, 51)",
      }}
    >
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
        <IconButton type="button" sx={{ p: "7px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Box>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={() => setState(!state)}
      >
        <MapsUgcIcon />
      </IconButton>
      <Drawer anchor={"left"} open={state} onClose={() => setState(false)}>
        <Box
          className="sticky top-0 bg-emerald-900 z-50"
          sx={{ width: "340px" }}
        >
          <Box className="flex justify-around items-center w-100 p-3">
            <IconButton
              onClick={() => setState(!state)}
              sx={{ color: "white" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{ color: "white" }}
            >
              New Chat
            </Typography>
          </Box>
        </Box>
        {list()}
      </Drawer>
    </Paper>
  );
}
