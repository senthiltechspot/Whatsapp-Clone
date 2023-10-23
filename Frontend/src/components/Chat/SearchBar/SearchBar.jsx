import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box } from "@mui/material";

export default function SearchBar() {
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
      <Box sx={{backgroundColor: "white",borderRadius: "10px"}}>
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
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <FilterListIcon />
      </IconButton>
    </Paper>
  );
}
