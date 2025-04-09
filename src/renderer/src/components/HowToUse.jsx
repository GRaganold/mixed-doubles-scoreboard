/* eslint-disable react/no-unescaped-entities */

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Text
} from '@chakra-ui/react'

export default function HowToUseThis() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton aria-label="Search database" onClick={onOpen} colorScheme="orange" />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How To Use This Scoreboard</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto" maxH="300px">
            <Text fontSize="lg" mb={4}>
              To interact with the scoreboard, you can use the following hotkeys:
            </Text>

            <Text mb={4}>
              Pressing the Spacebar or Pressing the "0" key (Digit0 or Numpad0) will remove a
              flashing rock.
            </Text>

            <Text fontWeight="bold" mb={2}>
              Switching Hammer (Toggle A/B):
            </Text>
            <Text>
              Press the "5" key (Digit5 or Numpad5) key to toggle between Team A and Team B having
              the hammer.
            </Text>

            <Text fontWeight="bold" mb={2} mt={4}>
              Increase Team A Score:
            </Text>
            <Text>Press the "7" key (Digit7 or Numpad7) to increase Team A's score.</Text>

            <Text fontWeight="bold" mb={2} mt={4}>
              Increase Team B Score:
            </Text>
            <Text>Press the "9" key (Digit9 or Numpad9) to increase Team B's score.</Text>

            <Text fontWeight="bold" mb={2} mt={4}>
              To reset the End, score and rocks
            </Text>
            <Text>Press the "/" OR "\" to reset everything except the names and time.</Text>
            <Text fontWeight="bold" mb={2} mt={4}>
              To Start/Stop the Team timers
            </Text>
            <Text>
              Press the "1" key (Digit1 or Numpad1) to Start and stop team A Timer.
              <br />
              Press the "3" key (Digit3 or Numpad3) to Start and stop team B Timer.
            </Text>

            <Text fontWeight="bold" mb={2} mt={4}>
              To Start/Stop the bottom timer
            </Text>
            <Text>
              Press the "4" key (Digit4 or Numpad4) to Start and stop timer.
              <br />
              Press the "6" key (Digit6 or Numpad6) to reset Timer.
            </Text>

            <Text fontWeight="bold" mb={2} mt={4}>
              Full Reset:
            </Text>
            <Text mb={4}>
              Use Full Reset to reset the following:
              <br />
              Rocks, End, Scores, Names return to defaults, Team A gets the hammer
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
