import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  List,
  ListItem
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ModalCharactersProps } from '../types/types';

const ModalCharacters: React.FC<ModalCharactersProps> = ({ name, description, comics, series }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} backgroundColor={"#4199D1"} color={"white"} fontStyle={"normal"} fontWeight={"300"}>
        Info about the Character
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb={2}>Description:</Text>
            <Text textAlign="justify" mb={4}>{description || 'No description available'}</Text>

            <Text fontWeight="bold" mb={2}>Comics Appearances:</Text>
            <List spacing={2}>
              {comics.items.length > 0 ? (
                comics.items.map((comic, index) => (
                  <ListItem key={index}>{comic.name}</ListItem>
                ))
              ) : (
                <Text>No Comics Appearances</Text>
              )}
            </List>

            <Text fontWeight="bold" mt={4} mb={2}>Series Appearances:</Text>
            <List spacing={2}>
              {series.items.length > 0 ? (
                series.items.map((serie, index) => (
                  <ListItem key={index}>{serie.name}</ListItem>
                ))
              ) : (
                <Text>No Series Appearances</Text>
              )}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCharacters;
