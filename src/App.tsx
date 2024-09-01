import React, { useState, useEffect } from "react";
import { Image, Box, Button } from '@chakra-ui/react';
import MarvelCharacters from './components/FetchMarvelCharacter';
import './App.css';
import Logo from '/img/marvel.png';
import SearchInput from './components/SearchInput';
import { Character, CharactersResponse } from './types/types';
import axios from 'axios';

const App: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const timestamp = "1724980520";
      const apiKey = "bc6e2bee7fc2e631dd0124bb73dd6fbf";
      const hash = "1e82c887f12eeb0b720de3e7aee37700";

      try {
        const response = await axios.get<CharactersResponse>(
          `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hash}`
        );
        setAllCharacters(response.data.data.results);
        setFilteredCharacters(response.data.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleResults = (characters: Character[]) => {
    setFilteredCharacters(characters);
  };

  const handleLoading = (loadingState: boolean) => {
    setLoading(loadingState);
  };

  const handleError = (errorMessage: string | null) => {
    setError(errorMessage);
  };

  const handleReset = () => {
    setFilteredCharacters(allCharacters);
  };

  return (
    <div className="container">
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Image src={Logo} alt='Logo da Marvel' height={"96px"} width={"96px"} />
        <div className="title">Marvel Characters</div>
        <SearchInput 
          onResults={handleResults} 
          onLoading={handleLoading} 
          onError={handleError} 
        />
        
        {filteredCharacters.length !== allCharacters.length && (
          <Button 
            onClick={handleReset} 
            colorScheme="blue" 
            mt={4} 
            fontWeight={"300"}
            _hover={{ bg: "blue.600" }}
          >
            Show All Characters
          </Button>
        )}
      </Box>
      <Box p={20}>
        <MarvelCharacters 
          characters={filteredCharacters} 
          loading={loading} 
          error={error}
        />
      </Box>
    </div>
  );
};

export default App;
