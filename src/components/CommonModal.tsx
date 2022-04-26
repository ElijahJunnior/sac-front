import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Text, ModalFooter, Button } from "@chakra-ui/react"

type LoremProps = { 
  count?: number
}

export function Lorem({ count = 1 }: LoremProps) { 

  const lorems = []

  for (let i = 0; i < Math.ceil(count); i++) {
    lorems.push(
      "Sit nulla est ex deserunt exercitation anim occaecat. " + 
      "Nostrud ullamco deserunt aute id consequat veniam incididunt " + 
      "duis in sint irure nisi. Mollit officia cillum Lorem ullamco " + 
      "minim nostrud elit officia tempor esse quis."
    );
  }

  return(
    <>
      {
        lorems.map((lorem, ind) => 
          <Text key={ind}>
            {lorem}
          </Text>
        )
      }
    </>
  )
}

type CommonModalProps = { 
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export function CommonModal({ isOpen, onOpen, onClose }: CommonModalProps) {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Lorem count={2} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

}