import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addFavorite,
  removeFavorite,
  toggleFavorite,
} from "../../store/favoritesSlice";
import { Box, Button, Typography, Paper } from "@mui/material";
import type { Movie } from "../../interfaces";

const testMovie: Movie = {
  id: 999,
  title: "Test Movie",
  year: "2024",
  runtime: "120",
  genre: "Action",
  director: "Test Director",
};

const ReduxDebug: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: any) => state.favorites.movies);

  const handleAddTest = () => {
    console.log("Adding test movie");
    dispatch(addFavorite(testMovie));
  };

  const handleRemoveTest = () => {
    console.log("Removing test movie");
    dispatch(removeFavorite(999));
  };

  const handleToggleTest = () => {
    console.log("Toggling test movie");
    dispatch(toggleFavorite(testMovie));
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Redux Debug Panel
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Favorites Count: {favorites.length}
        </Typography>
        <Typography variant="body2">
          Favorites:{" "}
          {favorites
            .map((fav: any) => `${fav.title} (ID: ${fav.id})`)
            .join(", ")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="outlined" size="small" onClick={handleAddTest}>
          Add Test
        </Button>
        <Button variant="outlined" size="small" onClick={handleRemoveTest}>
          Remove Test
        </Button>
        <Button variant="outlined" size="small" onClick={handleToggleTest}>
          Toggle Test
        </Button>
      </Box>
    </Paper>
  );
};

export default ReduxDebug;
