/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Button, Box, Flex, Input, HStack, VStack, Text, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import colorStyles from './components/ColorStyles'

ControlPanel.propTypes = {
  teamAName: PropTypes.string,
  setTeamAName: PropTypes.func,
  spielName: PropTypes.string,
  setSpielName: PropTypes.func,
  spielGameType: PropTypes.string,
  setSpielGameType: PropTypes.func,
  teamBName: PropTypes.string,
  setTeamBName: PropTypes.func,
  hammerState: PropTypes.string,
  setHammerState: PropTypes.func,
  teamAScore: PropTypes.number,
  setTeamAScore: PropTypes.func,
  teamAColor: PropTypes.string,
  setTeamAColor: PropTypes.func,
  teamARockCountState: PropTypes.number,
  setTeamARockCountState: PropTypes.func,
  teamBScore: PropTypes.number,
  setTeamBScore: PropTypes.func,
  teamBColor: PropTypes.string,
  setTeamBColor: PropTypes.func,
  teamBRockCountState: PropTypes.number,
  setTeamBRockCountState: PropTypes.func,
  gameRockCountState: PropTypes.func,
  setGameRockCountState: PropTypes.func,
  end: PropTypes.number,
  setEnd: PropTypes.func,
  teamScores: PropTypes.arrayOf(
    PropTypes.shape({
      score1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      score2: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ).isRequired,
  setTeamScores: PropTypes.func.isRequired
}

const getColorStyles = (color) => {
  return (
    colorStyles[color] || {
      color: '#d1d2d3',
      bgGradient: `linear(to-b,#FFF, #333)`
    }
  )
}

export default function ControlPanel({
  teamAName,
  setTeamAName,
  teamBName,
  setTeamBName,
  hammerState,
  setHammerState,
  setTeamAScore,
  teamAColor,
  setTeamAColor,
  teamARockCountState,
  setTeamARockCountState,
  setTeamBScore,
  teamBColor,
  setTeamBColor,
  teamBRockCountState,
  setTeamBRockCountState,
  end,
  setEnd,
  teamScores,
  setTeamScores,
  setSpielName,
  spielName,
  setSpielGameType,
  spielGameType,
  gameRockCountState,
  setGameRockCountState
}) {
  const teamAStyles = getColorStyles(teamAColor)
  const teamBStyles = getColorStyles(teamBColor)
  const hoverStyle = { color: 'white', bg: 'black' }
  const nonTeamButtons = { color: 'white', bg: '#3c4142', _hover: hoverStyle }

  const handleTeamANameChange = (event) => {
    setTeamAName(event.target.value)
  }

  const handleTeamBNameChange = (event) => {
    setTeamBName(event.target.value)
  }

  const handleSpielName = (event) => {
    setSpielName(event.target.value)
  }

  const handleHammerToggle = () => {
    setHammerState(hammerState === 'A' ? 'B' : 'A')
  }

  const handleResetAScore = () => {
    setTeamAScore(0)
  }

  const handleIncreaseARock = () => {
    setTeamARockCountState(teamARockCountState + 1)
  }

  const handleDecreaseARock = () => {
    setTeamARockCountState(Math.max(0, teamARockCountState - 1))
  }

  const handleResetARock = () => {
    setTeamARockCountState(gameRockCountState)
  }

  const handleResetBScore = () => {
    setTeamBScore(0)
  }

  const handleIncreaseBRock = () => {
    setTeamBRockCountState(teamBRockCountState + 1)
  }

  const handleDecreaseBRock = () => {
    setTeamBRockCountState(Math.max(0, teamBRockCountState - 1))
  }

  const handleResetBRock = () => {
    setTeamBRockCountState(gameRockCountState)
  }

  const ButtonTeamBWithHammer = ({
    teamBRockCountState,
    teamARockCountState,
    handleDecreaseARock,
    handleDecreaseBRock,
    handleIncreaseEnd
  }) => {
    ButtonTeamBWithHammer.propTypes = {
      teamBRockCountState: PropTypes.number.isRequired,
      teamARockCountState: PropTypes.number.isRequired,
      handleDecreaseARock: PropTypes.func.isRequired,
      handleDecreaseBRock: PropTypes.func.isRequired,
      handleIncreaseEnd: PropTypes.func.isRequired
    }
    const totalRocks = teamBRockCountState + teamARockCountState

    const handleTeamBWithHammer = () => {
      if (teamBRockCountState !== 0 && teamARockCountState !== 0 && totalRocks % 2 === 0) {
        handleDecreaseARock()
      } else if (teamBRockCountState === 0 && teamARockCountState === 0) {
        handleIncreaseEnd()
      } else {
        handleDecreaseBRock()
      }
    }

    const handleSpaceKeyPress = (event) => {
      if (event.code === 'Space' || event.code === 'Digit0' || event.code === 'Numpad0') {
        handleTeamBWithHammer()
      }
    }

    useEffect(() => {
      document.addEventListener('keydown', handleSpaceKeyPress)

      return () => {
        document.removeEventListener('keydown', handleSpaceKeyPress)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Empty dependency array ensures the effect runs only once on mount

    return (
      <HStack>
        <Text
          w="200px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          textAlign={'end'}
        >
          {teamBName === '' ? 'Team B has hammer' : teamBName + ' has hammer'}
        </Text>
        <Button
          onClick={handleTeamBWithHammer}
          _hover={hoverStyle}
          bg={
            teamBRockCountState !== 0 && teamARockCountState !== 0 && totalRocks % 2 === 0
              ? teamAStyles.bg
              : teamBStyles.bg
          }
          color={
            teamBRockCountState !== 0 && teamARockCountState !== 0 && totalRocks % 2 === 0
              ? teamAStyles.color
              : teamBStyles.color
          }
        >
          -
        </Button>
      </HStack>
    )
  }

  const ButtonTeamAWithHammer = ({
    teamBRockCountState,
    teamARockCountState,
    handleDecreaseARock,
    handleDecreaseBRock,
    handleIncreaseEnd
  }) => {
    ButtonTeamAWithHammer.propTypes = {
      teamBRockCountState: PropTypes.number.isRequired,
      teamARockCountState: PropTypes.number.isRequired,
      handleDecreaseARock: PropTypes.func.isRequired,
      handleDecreaseBRock: PropTypes.func.isRequired,
      handleIncreaseEnd: PropTypes.func.isRequired
    }

    const totalRocks = teamARockCountState + teamBRockCountState
    const handleTeamAWithHammer = () => {
      if (teamARockCountState !== 0 && teamBRockCountState !== 0 && totalRocks % 2 === 0) {
        handleDecreaseBRock()
      } else if (teamBRockCountState === 0 && teamARockCountState === 0) {
        handleIncreaseEnd()
      } else {
        handleDecreaseARock()
      }
    }

    const handleSpaceKeyPress = (event) => {
      if (event.code === 'Space' || event.code === 'Digit0' || event.code === 'Numpad0') {
        handleTeamAWithHammer()
      }
    }

    useEffect(() => {
      document.addEventListener('keydown', handleSpaceKeyPress)

      return () => {
        document.removeEventListener('keydown', handleSpaceKeyPress)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Empty dependency array ensures the effect runs only once on mount

    return (
      <HStack>
        <Text
          w="200px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          textAlign={'end'}
        >
          {teamAName === '' ? 'Team A has hammer' : teamAName + ' has hammer'}
        </Text>
        <Button
          bg={
            teamARockCountState !== 0 && teamBRockCountState !== 0 && totalRocks % 2 === 0
              ? teamBStyles.bg
              : teamAStyles.bg
          }
          _hover={hoverStyle}
          color={
            teamARockCountState !== 0 && teamBRockCountState !== 0 && totalRocks % 2 === 0
              ? teamBStyles.color
              : teamAStyles.color
          }
          onClick={handleTeamAWithHammer}
        >
          -
        </Button>
      </HStack>
    )
  }

  const handleIncreaseEnd = () => {
    setEnd(end + 1)
    setTeamARockCountState(gameRockCountState)
    setTeamBRockCountState(gameRockCountState)
  }

  const handleDecreaseEnd = () => {
    setEnd(Math.max(1, end - 1))
    setTeamARockCountState(gameRockCountState)
    setTeamBRockCountState(gameRockCountState)
  }

  const handleResetEnd = () => {
    setEnd(1)
    setTeamARockCountState(gameRockCountState)
    setTeamBRockCountState(gameRockCountState)
    setTeamAScore(0)
    setTeamBScore(0)
    setTeamScores([
      { score1: 0, score2: 0 },
      { score1: 0, score2: 0 },
      { score1: 0, score2: 0 },
      { score1: 0, score2: 0 },
      { score1: 0, score2: 0 },
      { score1: 0, score2: 0 },
      { score1: 0, score2: 0 },
      { score1: 0, score2: 0 },
      { score1: 'X', score2: 'X' },
      { score1: 'X', score2: 'X' }
    ])
  }

  // Handle score change for a specific end and team
  const handleScoreChange = (endIndex, teamKey, newScore, end) => {
    const updatedScores = [...teamScores]

    // Set the new score for the selected team
    updatedScores[endIndex][teamKey] = newScore

    // Reset the other team's score to "0"
    if (teamKey === 'score1') {
      updatedScores[endIndex]['score2'] = '0'
      setHammerState('B')
    }
    if (teamKey === 'score2') {
      updatedScores[endIndex]['score1'] = '0'
      setHammerState('A')
    }

    // Handle "X" entries
    if (teamKey === 'score2' && newScore === 'X') {
      updatedScores[endIndex]['score1'] = 'X'
    }
    if (teamKey === 'score1' && newScore === 'X') {
      updatedScores[endIndex]['score2'] = 'X'
    }

    // Update local score state
    setTeamScores(updatedScores)

    // Calculate total scores
    let totalTeamAScore = 0
    let totalTeamBScore = 0
    updatedScores.forEach((endScore) => {
      totalTeamAScore += parseInt(endScore.score1, 10) || 0
      totalTeamBScore += parseInt(endScore.score2, 10) || 0
    })

    setTeamAScore(totalTeamAScore)
    setTeamBScore(totalTeamBScore)

    // Advance end
    setEnd(endIndex + 2)

    // ✅ Use latest state values (not passed-in props)
    if (teamARockCountState + teamBRockCountState <= 3) {
      setTeamARockCountState(gameRockCountState)
      setTeamBRockCountState(gameRockCountState)
    }
  }

  const renderEndScores = () => {
    const optionStyleA = { backgroundColor: teamAStyles.bg, color: teamAStyles.color }
    const optionStyleB = { backgroundColor: teamBStyles.bg, color: teamBStyles.color }
    return (
      <HStack align="start" spacing={1} fontSize={'sm'}>
        {teamScores.map((scores, index) => (
          <VStack key={index} spacing={4} alignItems="center" gap={'5px'}>
            <Text fontWeight={'bold'}>{`End ${index + 1}`}</Text>
            <Box>
              <Select
                value={scores.score1}
                onChange={(e) => {
                  handleScoreChange(index, 'score1', e.target.value)
                }}
                size="sm"
                bg={teamAStyles.bg}
                color={teamAStyles.color}
                borderRadius={5}
              >
                <option style={optionStyleA} value="0">
                  0
                </option>
                <option style={optionStyleA} value="1">
                  1
                </option>
                <option style={optionStyleA} value="2">
                  2
                </option>
                <option style={optionStyleA} value="3">
                  3
                </option>
                <option style={optionStyleA} value="4">
                  4
                </option>
                <option style={optionStyleA} value="5">
                  5
                </option>
                <option style={optionStyleA} value="6">
                  6
                </option>
                <option style={optionStyleA} value="7">
                  7
                </option>
                <option style={optionStyleA} value="8">
                  8
                </option>
                <option style={optionStyleA} value="X">
                  X
                </option>
              </Select>
            </Box>
            <Box>
              <Select
                value={scores.score2}
                onChange={(e) => {
                  handleScoreChange(index, 'score2', e.target.value)
                }}
                size="sm"
                bg={teamBStyles.bg}
                color={teamBStyles.color}
                borderRadius={5}
              >
                <option style={optionStyleB} value="0">
                  0
                </option>
                <option style={optionStyleB} value="1">
                  1
                </option>
                <option style={optionStyleB} value="2">
                  2
                </option>
                <option style={optionStyleB} value="3">
                  3
                </option>
                <option style={optionStyleB} value="4">
                  4
                </option>
                <option style={optionStyleB} value="5">
                  5
                </option>
                <option style={optionStyleB} value="6">
                  6
                </option>
                <option style={optionStyleB} value="7">
                  7
                </option>
                <option style={optionStyleB} value="8">
                  8
                </option>
                <option style={optionStyleB} value="X">
                  X
                </option>
              </Select>
            </Box>
            <Button
              key={index}
              onClick={(e) => {
                handleScoreChange(index, 'score1', 'X'), handleScoreChange(index, 'score2', 'X')
              }}
              w="50px"
              h="32px"
              color={nonTeamButtons.color}
              bg={nonTeamButtons.bg}
              _hover={nonTeamButtons._hover}
            >
              X
            </Button>
          </VStack>
        ))}
      </HStack>
    )
  }

  return (
    <Box background="#00ff00">
      <Flex fontSize={'sm'} pr={2}>
        <Box display={'flex'} justify="start" bg="#E8E8E8" rounded={'md'} p={2}>
          <VStack color="black" m={1} w="650px">
            <Box w="full">
              <HStack>
              <Select
                value={gameRockCountState}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  setGameRockCountState(value) // ✅ set main game-level rock count
                  setTeamARockCountState(value) // optional: sync team A
                  setTeamBRockCountState(value) // optional: sync team B
                }}
                bg="white"
                w="250px"
                _focus={{ bg: 'white' }}
                size="sm"
                borderRadius={5}
              >
                <option value="" disabled>
                  - stages of competition -
                </option>
                <option value={8}>Four person</option>
                <option value={5}>Mixed Doubles</option>
                <option value={6}>Triples</option>
              </Select>

                <Button
                  h="8"
                  w="full"
                  onClick={() => {
                    handleResetARock()
                    handleResetBRock()
                    handleResetEnd()
                    handleResetAScore()
                    handleResetBScore()
                    setTeamAName('Team A Name')
                    setTeamBName('Team B Name')
                    setHammerState('A')
                    setTeamScores([
                      { score1: 0, score2: 0 },
                      { score1: 0, score2: 0 },
                      { score1: 0, score2: 0 },
                      { score1: 0, score2: 0 },
                      { score1: 0, score2: 0 },
                      { score1: 0, score2: 0 },
                      { score1: 0, score2: 0 },
                      { score1: 0, score2: 0 },
                      { score1: 'X', score2: 'X' },
                      { score1: 'X', score2: 'X' }
                      // Add more initial entries as needed
                    ])
                  }}
                  color={nonTeamButtons.color}
                  bg={nonTeamButtons.bg}
                  _hover={nonTeamButtons._hover}
                >
                  Full Reset
                </Button>
              </HStack>
              <Flex
                w="full"
                justify="center"
                align="center"
                direction="row"
                spacing={1}
                pt={3}
                gap={2}
              >
                <Select
                  value={spielGameType || ''}
                  onChange={(e) => setSpielGameType(e.target.value)}
                  bg={'white'}
                  w="250px"
                  _focus={{ bg: 'white' }}
                  size="sm"
                  borderRadius={5}
                >
                  <option value="" disabled>
                    - stages of competition -
                  </option>
                  <option value="Round Robin">Round Robin</option>
                  <option value="Playoff">Playoff</option>
                  <option value="Quarter Final">Quarter Final</option>
                  <option value="Semi Final">Semi Final</option>
                  <option value="Final">Final</option>
                  <option value="Tiebreaker">Tiebreaker</option>
                </Select>
                <Input
                  type="text"
                  value={spielName}
                  onChange={handleSpielName}
                  variant="outline"
                  placeholder="Spiel name"
                  bg={'white'}
                  size="sm"
                  borderRadius={5}
                  _focus={{ bg: 'white' }}
                />
                <Button
                  h="8"
                  color={nonTeamButtons.color}
                  bg={nonTeamButtons.bg}
                  _hover={nonTeamButtons._hover}
                  onClick={() => setSpielName('Mixed Doubles Championships')}
                >
                  Reset
                </Button>
              </Flex>
              {/* ------------------------------------------ */}
              {/* Team A */}
              {/* ------------------------------------------ */}
              <VStack
                w="full"
                justify="center"
                align="center"
                direction="column"
                spacing={1}
                pt={3}
              >
                <Flex
                  justify="center"
                  align="center"
                  w="full"
                  spacing={5}
                  paddingLeft={20}
                  paddingRight={20}
                >
                  <Input
                    type="text"
                    value={teamAName}
                    onChange={handleTeamANameChange}
                    variant="outline"
                    placeholder="Team A"
                    bg={'white'}
                    size="sm"
                    borderRadius={5}
                    _focus={{ bg: 'white' }}
                  />
                </Flex>

                <Flex direction="row" justify="space-around" align="center" w="full" spacing={5}>
                  <Select
                    value={teamAColor || ''}
                    onChange={(e) => setTeamAColor(e.target.value)}
                    bg={'white'}
                    w="250px"
                    _focus={{ bg: 'white' }}
                    size="sm"
                    borderRadius={5}
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

                  <Text> Rocks : </Text>
                  <Button
                    bg={teamAStyles.bg}
                    color={teamAStyles.color}
                    _hover={hoverStyle}
                    onClick={handleDecreaseARock}
                    className={'handleDecreaseARock'}
                    isDisabled={teamARockCountState === 0}
                  >
                    -
                  </Button>
                  <Text> {teamARockCountState}</Text>
                  <Button
                    bg={teamAStyles.bg}
                    color={teamAStyles.color}
                    _hover={hoverStyle}
                    onClick={handleIncreaseARock}
                    isDisabled={teamARockCountState === gameRockCountState}
                    className="handleIncreaseARock"
                  >
                    +
                  </Button>

                  <Button
                    bg={teamAStyles.bg}
                    color={teamAStyles.color}
                    _hover={hoverStyle}
                    onClick={handleResetARock}
                    isDisabled={teamARockCountState === gameRockCountState}
                  >
                    Reset
                  </Button>
                </Flex>
              </VStack>
              {/* ------------------------------------------ */}
              {/* Team B */}
              {/* ------------------------------------------ */}
              <VStack
                w="full"
                justify="center"
                align="center"
                direction="column"
                spacing={1}
                pt={3}
              >
                <Flex
                  justify="center"
                  align="center"
                  w="full"
                  spacing={5}
                  paddingLeft={20}
                  paddingRight={20}
                >
                  <Input
                    type="text"
                    value={teamBName}
                    onChange={handleTeamBNameChange}
                    variant="outline"
                    placeholder="Team B"
                    bg={'white'}
                    _focus={{ bg: 'white' }}
                    size="sm"
                    borderRadius={5}
                  />
                </Flex>

                <Flex direction="row" justify="space-around" align="center" w="full" spacing={5}>
                  <Select
                    value={teamBColor || ''}
                    onChange={(e) => setTeamBColor(e.target.value)}
                    w="250px"
                    variant="outline"
                    _focus={{ bg: 'white' }}
                    size="sm"
                    bg={'white'}
                    borderRadius={5}
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

                  <Text> Rocks : </Text>
                  <Button
                    bg={teamBStyles.bg}
                    color={teamBStyles.color}
                    _hover={hoverStyle}
                    onClick={handleDecreaseBRock}
                    className={'handleDecreaseBRock'}
                    isDisabled={teamBRockCountState === 0}
                  >
                    -
                  </Button>
                  <Text> {teamBRockCountState}</Text>
                  <Button
                    bg={teamBStyles.bg}
                    color={teamBStyles.color}
                    _hover={hoverStyle}
                    onClick={handleIncreaseBRock}
                    className={'handleIncreaseBRock'}
                    isDisabled={teamBRockCountState === gameRockCountState}
                  >
                    +
                  </Button>

                  <Button
                    bg={teamBStyles.bg}
                    color={teamBStyles.color}
                    _hover={hoverStyle}
                    onClick={handleResetBRock}
                    className={'handleResetBRock'}
                    isDisabled={teamBRockCountState === gameRockCountState}
                  >
                    Reset
                  </Button>
                </Flex>
              </VStack>
            </Box>
            {renderEndScores()}
            <Flex direction="row" justify={'center'} gap={5} w="100%" align="center">
              <Text> End :</Text>
              <Button
                color={nonTeamButtons.color}
                bg={nonTeamButtons.bg}
                _hover={nonTeamButtons._hover}
                onClick={handleDecreaseEnd}
                isDisabled={end === 1}
              >
                -
              </Button>
              <Text> {end}</Text>
              <Button
                color={nonTeamButtons.color}
                bg={nonTeamButtons.bg}
                _hover={nonTeamButtons._hover}
                onClick={handleIncreaseEnd}
                isDisabled={end === 10}
              >
                +
              </Button>
              <Button
                color={nonTeamButtons.color}
                bg={nonTeamButtons.bg}
                _hover={nonTeamButtons._hover}
                onClick={handleResetEnd}
                isDisabled={
                  end === 1 &&
                  teamARockCountState === gameRockCountState &&
                  teamBRockCountState === gameRockCountState
                }
              >
                Reset
              </Button>
            </Flex>

            <Flex direction="row" justify="space-evenly" w="100%" align="center">
              <Button
                w="250px"
                onClick={handleHammerToggle}
                bg={hammerState === 'A' ? teamAStyles.bg : teamBStyles.bg}
                color={hammerState === 'A' ? teamAStyles.color : teamBStyles.color}
                _hover={hoverStyle}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                fontSize={'xs'}
              >
                {hammerState === 'A' ? teamAName || 'Team A' : teamBName || 'Team B'} has hammer
              </Button>
              {hammerState === 'A' ? (
                <>
                  <ButtonTeamAWithHammer
                    teamBRockCountState={teamBRockCountState}
                    teamARockCountState={teamARockCountState}
                    handleDecreaseARock={handleDecreaseARock}
                    handleDecreaseBRock={handleDecreaseBRock}
                    handleIncreaseEnd={handleIncreaseEnd}
                  />
                </>
              ) : (
                <>
                  <ButtonTeamBWithHammer
                    _hover={hoverStyle}
                    teamBRockCountState={teamBRockCountState}
                    teamARockCountState={teamARockCountState}
                    handleDecreaseARock={handleDecreaseARock}
                    handleDecreaseBRock={handleDecreaseBRock}
                    handleIncreaseEnd={handleIncreaseEnd}
                  />
                </>
              )}
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}
