import {Modal,
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody,
  Stack,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

export const CustomModal = (props) => {
  const {selectedCharacter, closeModal} = props;
  return(
    <Modal isOpen={selectedCharacter.visible} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as='h3' size='lg'>
            {selectedCharacter.name}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={selectedCharacter.image} alt={selectedCharacter.name} boxSize='100%' fit='contain' marginBottom='20px'/>
            {
              selectedCharacter.status &&
              <Stack direction='row' align='center' justify='space-between'>
                <Text fontSize='xl' fontWeight='bold'>Status:</Text>
                <Text fontSize='lg'>{selectedCharacter.status}</Text>
              </Stack>
            }
            {
              selectedCharacter.species &&
              <Stack direction='row' align='center' justify='space-between'>
                <Text fontSize='xl' fontWeight='bold'>Species:</Text>
                <Text fontSize='lg'>{selectedCharacter.species}</Text>
              </Stack>
            }
            {
              selectedCharacter.gender &&
              <Stack direction='row' align='center' justify='space-between'>
                <Text fontSize='xl' fontWeight='bold'>Gender:</Text>
                <Text fontSize='lg'>{selectedCharacter.gender}</Text>
              </Stack>
            }
            {
              selectedCharacter.type &&
              <Stack direction='row' align='center' justify='space-between'>
                <Text fontSize='xl' fontWeight='bold'>Type:</Text>
                <Text fontSize='lg'>{selectedCharacter.type}</Text>
              </Stack>
            }
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}