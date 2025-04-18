import { Box, Text, VStack, Flex } from '@chakra-ui/react'
import TeamARocks from './components/TeamARocks'
import TeamBRocks from './components/TeamBRocks'
import { HammerIcon } from './components/Hammer'
import colorStyles from './components/ColorStyles'
import PropTypes from 'prop-types'

const getColorStyles = (color) => {
  return (
    colorStyles[color] || {
      color: '#d1d2d3',
      bgGradient: `linear(to-b,#FFF, #333)`
    }
  )
}

const TeamComponent = ({
  teamLetter,
  teamName,
  teamColor,
  teamStyles,
  teamScore,
  hammerState,
  Background,
  /* eslint-disable */
  gameRockCountState
  /* eslint-enable */
}) => {
  const textShadowValue =
    teamColor !== 'yellow'
      ? '1px 1px 2px rgba(0, 0, 0, 0.8)'
      : '1px 1px 2px rgba(255, 255, 255, 0.8)'
  return (
    <Flex w="full" bg={Background} bgGradient={teamStyles.bgGradient} h="50px">
      <Text
        w="290px"
        className={`team${teamLetter}Name`}
        textAlign="left"
        fontSize="2xl"
        textShadow={textShadowValue}
        color={teamStyles.color}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        ml="10px"
        alignContent="center"
      >
        {teamName || `Team ${teamLetter}`}
      </Text>
      <Flex
        w="40px"
        mx="3px"
        align="center"
        justify="center"
        className={`team${teamLetter}HammerState`}
      >
        {hammerState === teamLetter ? (
          <HammerIcon h="36px" w="32px" color={teamColor !== 'yellow' ? 'white' : 'black'} />
        ) : null}
      </Flex>
      <Text
        textAlign="center"
        alignContent="center"
        color={teamStyles.color}
        className={`team${teamLetter}Score`}
        w="40px"
        textShadow={textShadowValue}
        mx="5px"
      >
        {teamScore}
      </Text>
    </Flex>
  )
}
VerticalScoreboard.propTypes = {
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
  setTeamScores: PropTypes.func.isRequired,
  teamAStyles: PropTypes.shape({
    bgGradient: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  teamBStyles: PropTypes.shape({
    bgGradient: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
}

TeamComponent.propTypes = {
  teamLetter: PropTypes.string.isRequired,
  teamName: PropTypes.string,
  teamColor: PropTypes.string.isRequired,
  teamStyles: PropTypes.shape({
    bgGradient: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  teamScore: PropTypes.number.isRequired,
  hammerState: PropTypes.string.isRequired,
  Background: PropTypes.string.isRequired,
  gameRockCountState: PropTypes.number // Define this if needed for prop validation
}

export default function VerticalScoreboard({
  teamAName,
  teamAScore,
  teamAColor,
  teamARockCountState,
  teamBName,
  teamBScore,
  teamBColor,
  teamBRockCountState,
  end,
  hammerState,
  spielGameType,
  gameRockCountState
}) {
  const Background = '#f1f2f3'

  const teamAStyles = getColorStyles(teamAColor)
  const teamBStyles = getColorStyles(teamBColor)

  const getOrdinalSuffix = (num) => {
    const lastDigit = num % 10
    if (num === 11 || num === 12 || num === 13) {
      return 'th'
    } else if (lastDigit === 1) {
      return 'st'
    } else if (lastDigit === 2) {
      return 'nd'
    } else if (lastDigit === 3) {
      return 'rd'
    } else {
      return 'th'
    }
  }

  return (
    <Flex bg="transparent" h="auto">
      <Flex w="100%" justify={'center'}>
        <VStack
          fontSize="3xl"
          color="#fefefe"
          gap="2px"
          zIndex={5}
          w="350px"
          letterSpacing={'1.5px'}
          h="130"
          bg="black"
          p={'2px'}
        >
          <Flex justify="center" w="full" h="30px">
            <Flex justify="space-between" w="full" h="full" bg="#fff" alignContent={'center'}>
              <Text
                textAlign="left"
                w="full"
                h="full"
                alignContent={'center'}
                color="#000"
                letterSpacing={'2px'}
                fontSize="md"
                fontWeight={'bold'}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                ml="10px"
              >
                {spielGameType || 'Round Robin'}
              </Text>
              <Text
                textAlign="right"
                w="full"
                color="#000"
                letterSpacing={'2px'}
                fontSize="lg"
                fontWeight={'bold'}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                mr="3px"
                alignContent={'center'}
              >
                {end}
                {getOrdinalSuffix(end)} End
              </Text>
            </Flex>
          </Flex>

          {/* Team A Info */}
          <TeamComponent
            teamLetter="A"
            teamName={teamAName}
            teamColor={teamAColor}
            teamStyles={teamAStyles}
            teamScore={teamAScore}
            hammerState={hammerState}
            Background={Background}
            h="60px"
          />

          {/* Team B Info */}
          <TeamComponent
            teamLetter="B"
            teamName={teamBName}
            teamColor={teamBColor}
            teamStyles={teamBStyles}
            teamScore={teamBScore}
            hammerState={hammerState}
            Background={Background}
            h="60px"
          />
        </VStack>
        <Flex
          className="Rock Display"
          align={'end'}
          ml="-20px"
          gap="2px"
          h="130px"
          p={'2px'}
          pb={0}
        >
          {teamBRockCountState !== 0 || teamARockCountState !== 0 ? (
            <VStack
              gap="0px"
              w="auto"
              className="teamBRocks"
              justifyContent="flex-start"
              bg="#000"
              justify={'left'}
            >
              <Box bg="d1d2d3" w="full">
                <TeamARocks
                  hammerState={hammerState}
                  teamBRockCountState={teamBRockCountState}
                  teamBColor={teamBColor}
                  teamARockCountState={teamARockCountState}
                  teamAColor={teamAColor}
                  gameRockCountState={gameRockCountState}
                />
              </Box>
              <Box bg="d1d2d3" w="full">
                <TeamBRocks
                  hammerState={hammerState}
                  teamBRockCountState={teamBRockCountState}
                  teamBColor={teamBColor}
                  teamARockCountState={teamARockCountState}
                  teamAColor={teamAColor}
                  gameRockCountState={gameRockCountState}
                />
              </Box>
            </VStack>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}
