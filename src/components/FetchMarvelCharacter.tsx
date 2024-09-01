import React from "react";
import { MarvelCharactersProps } from "../types/types";
import { Text, Box, Grid, Tooltip, Image } from "@chakra-ui/react";
import ModalCharacters from "./Modal";

const MarvelCharacters: React.FC<MarvelCharactersProps> = ({ characters, loading, error }) => {
  if (loading) return <Text color={"white"} textAlign={"center"}>Loading Info...</Text>;
  if (error) return <Text color={"white"} textAlign={"center"}>{error}</Text>;

  return (
    <Box p={20}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} backgroundColor={"white"} borderRadius={20}>
        {characters.map((character) => (
          <Box
            key={character.id}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Tooltip label={character.name} aria-label='Character Name'>
              <Image
                src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
                alt={character.name}
                paddingTop={"10px"}
              />
            </Tooltip>
            <Box p={4}>
              <ModalCharacters
                name={character.name}
                description={character.description}
                comics={character.comics}
                series={character.series}
              />
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default MarvelCharacters;
