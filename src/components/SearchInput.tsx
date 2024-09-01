import React, { useState } from "react";
import axios from "axios";
import { Character, CharactersResponse } from "../types/types";
import { Input, InputGroup, InputLeftElement, InputRightElement, Button } from "@chakra-ui/react";
import { IoIosSearch, IoIosClose } from "react-icons/io";

interface SearchInputProps {
  onResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onResults, onLoading, onError }) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchInput) {
      onResults([]);
      return;
    }

    onLoading(true);
    const timestamp = "1724980520";
    const apiKey = "bc6e2bee7fc2e631dd0124bb73dd6fbf";
    const hash = "1e82c887f12eeb0b720de3e7aee37700";

    try {
      const response = await axios.get<CharactersResponse>(
        `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(searchInput)}&ts=${timestamp}&apikey=${apiKey}&hash=${hash}`
      );
      onResults(response.data.data.results);
      onError(null);
    } catch (error) {
      console.error("Error fetching characters:", error);
      onError('Failed to fetch characters');
    } finally {
      onLoading(false);
    }
  };

  const handleClear = () => {
    setSearchInput("");
    onResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <InputGroup maxWidth={"600px"}>
        <InputLeftElement
          pointerEvents="none"
          children={<IoIosSearch color="white" />}
        />
        <Input 
          type="search" 
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          color={"white"} 
          fontSize={"14px"} 
          fontWeight={"300"} 
          placeholder="Search Characters" 
          _placeholder={{ color: 'white', fontSize: '14px', fontStyle: 'italic' }}
        />
        <InputRightElement>
          {searchInput && (
            <Button 
              variant="link"
              onClick={handleClear}
              aria-label="Clear search"
              color="white"
              _hover={{ color: "gray.400" }}
            >
              <IoIosClose size={20} />
            </Button>
          )}
        </InputRightElement>
        <Button 
          onClick={handleSearch} 
          colorScheme="red" 
          ml={2} 
          fontWeight={"300"}
          _hover={{ bg: "red.600" }}
        >
          Search
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchInput;
