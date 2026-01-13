import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import ThemeContext from "../context/ThemeContext"

function PokemonDetail() {

  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const { theme } = useContext(ThemeContext);

  function fetchPokemonDetail() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      setPokemon(response.data);
    });
  }

  useEffect(() => {
    fetchPokemonDetail();
  }, []);

  if(!pokemon) {
    return <CircularProgress />;
  }

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <Box>
      <Box>
        <img src={imageUrl} alt={name} style={{width: "100%", maxWidth: "300px"}}/>
      </Box>

      <Typography variant="h2" gutterBottom sx={{marginTop: 2}}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>
    </Box>
  );
}

export default PokemonDetail;