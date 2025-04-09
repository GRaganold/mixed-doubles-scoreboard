import { HStack, VStack, Text, Box, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export function RenderEndScores({ teamScores, handleScoreChange }) {
  return (
    <HStack align="start" spacing={2}>
      {teamScores.map((scores, index) => (
        <VStack key={index} spacing={3} alignItems="center">
          <Text>{`End ${index + 1}`}</Text>
          <Box>
            <Select
              value={scores.score1}
              onChange={(e) => handleScoreChange(index, 'score1', e.target.value)}
            >
              <option value="0">0 </option>
              <option value="1">1 </option>
              <option value="2">2 </option>
              <option value="3">3 </option>
              <option value="4">4 </option>
              <option value="5">5 </option>
              <option value="6">6 </option>
              <option value="7">7 </option>
              <option value="8"> 8</option>
              <option value="X"> X </option>
            </Select>
          </Box>
          <Box>
            <Select
              value={scores.score2}
              onChange={(e) => handleScoreChange(index, 'score2', e.target.value)}
            >
              {' '}
              <option value="0">0 </option>
              <option value="1">1 </option>
              <option value="2">2 </option>
              <option value="3">3 </option>
              <option value="4">4 </option>
              <option value="5">5 </option>
              <option value="6">6 </option>
              <option value="7">7 </option>
              <option value="8"> 8</option>
              <option value="X"> X </option>
            </Select>
          </Box>
        </VStack>
      ))}
    </HStack>
  )
}

RenderEndScores.propTypes = {
  teamScores: PropTypes.array.isRequired,
  handleScoreChange: PropTypes.func.isRequired
}
