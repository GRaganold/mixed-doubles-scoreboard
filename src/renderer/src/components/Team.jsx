/* eslint-disable react/prop-types */
import { HStack, Text, Input, Select, VStack } from '@chakra-ui/react'

export default function Team({ teamName, onNameChange, teamColor, onColorChange }) {
  return (
    <VStack>
      <HStack spacing={4}>
        <Text w="135px">Team Name</Text>
        <Input
          w="full"
          type="text"
          value={teamName || ''}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter Team Name"
          bg="white"
        />
        <Text w="125px">Color</Text>
        <Select
          value={teamColor || ''}
          onChange={(e) => onColorChange(e.target.value)}
          bg={'white'}
        >
          <option value="" disabled>
            --- Select a color ---
          </option>
          <option value="red">red</option>
          <option value="yellow">yellow</option>
          <option value="darkBlue">dark blue</option>
          <option value="blue">blue</option>
          <option value="black">black</option>
          <option value="green">green</option>
        </Select>
      </HStack>
    </VStack>
  )
}
