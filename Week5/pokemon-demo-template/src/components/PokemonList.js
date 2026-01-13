import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import PokemonCard from "./PokemonCard.js"

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  function fetchPokemons() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=800")
    .then((response) => setPokemons(response.data.results))
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchPokemons();
  }, [])

  return (
    <Grid container justifyContent="center">
      {pokemons.map((pokemon, index) => <PokemonCard pokemon={pokemon} index={index+1}/>)}
    </Grid>
  );
}

export default PokemonList;