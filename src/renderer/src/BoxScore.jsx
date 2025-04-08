import { Box, Text, VStack, Flex } from '@chakra-ui/react'
import { HammerIcon } from './components/Hammer'
import PropTypes from 'prop-types'
import colorStyles from './components/ColorStyles'

export default function BoxScore({
  teamScores,
  teamAName,
  teamAScore,
  teamAColor,
  teamBName,
  teamBScore,
  teamBColor,
  end,
  hammerState,
  spielGameType,
  spielName
}) {
  const getColorStyles = (color) => {
    return (
      colorStyles[color] || {
        color: '#d1d2d3',
        bgGradient: `linear(135deg,#333,#FFF, #333)`
      }
    )
  }

  const teamAStyles = getColorStyles(teamAColor)
  const teamBStyles = getColorStyles(teamBColor)

  const height = '30px'

  return (
    <>
      <Flex>
        <Flex padding="2px" fontSize={'xl'} bg="black">
          <VStack color="black" w="200px" align={'left'} justify={'center'} gap={0} spacing={0}>
            <Box
              h={height}
              textAlign={'center'}
              bgGradient="linear(to bottom, #303030 50%, #151515 60%, #101010 100%)"
              alignContent={'center'}
              overflow="hidden"
            >
              <Text
                textAlign="left"
                fontSize="10px"
                color="white"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                mx="10px"
              >
                {spielGameType || 'Round Robin'} - {spielName || 'Spiel'}
              </Text>
            </Box>
            <Box
              h={height}
              bgGradient={teamAStyles.bgGradient}
              color={teamAStyles.color}
              textAlign={'center'}
              alignContent={'center'}
            >
              <Text
                textShadow={
                  teamAColor !== 'yellow'
                    ? '1px 1px 2px rgba(0, 0, 0, 0.8)'
                    : '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }
                textAlign="left"
                fontSize="lg"
                color={teamAStyles.color}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                mx="10px"
                alignContent={'center'}
              >
                {teamAName || 'Team A'}
              </Text>
            </Box>
            <Box h="1px" bg="black"></Box>
            <Box
              h={height}
              w="full"
              bgGradient={teamBStyles.bgGradient}
              color={teamBStyles.color}
              textAlign={'center'}
              alignContent={'center'}
            >
              <Text
                textShadow={
                  teamBColor !== 'yellow'
                    ? '1px 1px 2px rgba(0, 0, 0, 0.8)'
                    : '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }
                textAlign="left"
                fontSize="lg"
                color={teamBStyles.color}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                mx="10px"
                alignContent={'center'}
              >
                {teamBName || 'Team B'}
              </Text>
            </Box>
          </VStack>
          {teamScores.map((scores, index) => {
            if (
              (index === 8 && scores.score1 === 'X' && scores.score2 === 'X') ||
              (index === 9 && scores.score1 === 'X' && scores.score2 === 'X')
            ) {
              return null
            }

            return (
              <VStack key={index} w="30px" justify={'center'} gap={0} spacing={0}>
                <Box
                  h={height}
                  w="full"
                  textAlign={'center'}
                  bgGradient="linear(to bottom, #303030 50%, #151515 60%, #101010 100%)"
                  alignContent={'center'}
                >
                  <Text
                    textShadow={
                      teamAColor !== 'yellow'
                        ? '1px 1px 2px rgba(0, 0, 0, 0.8)'
                        : '1px 1px 2px rgba(255, 255, 255, 0.8)'
                    }
                    textAlign="center"
                    fontSize="sm"
                    color="white"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    alignContent={'center'}
                  >
                    {index + 1}
                  </Text>
                </Box>
                <Box
                  h={height}
                  w="full"
                  bgGradient="linear(to bottom, #fff 50%, #c2c2c2 60%, #8a8a8a 100%)"
                  color={teamAStyles.color}
                  textAlign={'center'}
                  alignContent={'center'}
                >
                  {end <= index + 1 && scores.score1 !== 'X' && scores.score1 <= 0 ? (
                    <>
                      {end === index + 1 && hammerState === 'A' ? (
                        <Flex justify={'center'} align={'center'} p={'2px'}>
                          <HammerIcon h="25px" w="20px" color="black" />
                        </Flex>
                      ) : null}
                    </>
                  ) : (
                    <Text
                      w="full"
                      h="full"
                      textShadow="1px 1px 2px rgba(255, 255, 255, 0.8)"
                      textAlign="center"
                      fontSize="lg"
                      color="black"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      alignContent={'center'}
                    >
                      {scores.score1}
                    </Text>
                  )}
                </Box>
                <Box h="1px" bg="black"></Box>

                <Box
                  h={height}
                  w="full"
                  bgGradient="linear(to bottom, #fff 50%, #c2c2c2 60%, #8a8a8a 100%)"
                  color="black"
                  textAlign={'center'}
                  alignContent={'center'}
                >
                  {end <= index + 1 && scores.score2 !== 'X' && scores.score2 <= 0 ? (
                    <>
                      {end === index + 1 && hammerState === 'B' ? (
                        <Flex justify={'center'} align={'center'} p={'2px'}>
                          <HammerIcon h="25px" w="20px" color="Black" />
                        </Flex>
                      ) : null}
                    </>
                  ) : (
                    <Text
                      w="full"
                      h="full"
                      textShadow="1px 1px 2px rgba(255, 255, 255, 0.8)"
                      textAlign="center"
                      fontSize="lg"
                      color="black"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      alignContent={'center'}
                    >
                      {scores.score2}
                    </Text>
                  )}
                </Box>
              </VStack>
            )
          })}
          <VStack w="60px" justify={'center'} gap={0} spacing={0}>
            <Box
              h={height}
              w="full"
              textAlign={'center'}
              bgGradient="linear(to bottom, #303030 50%, #151515 60%, #101010 100%)"
              alignContent={'center'}
            >
              <Text
                textShadow="1px 1px 2px rgba(00, 00, 00, 0.8)"
                fontSize="sm"
                color="white"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                textAlign={'Center'}
              >
                Total
              </Text>
            </Box>
            <Box
              h={height}
              w="full"
              bgGradient={teamAStyles.bgGradient}
              color={teamAStyles.color}
              textAlign={'Center'}
            >
              <Text
                textShadow={
                  teamAColor !== 'yellow'
                    ? '1px 1px 2px rgba(0, 0, 0, 0.8)'
                    : '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }
              >
                {teamAScore}
              </Text>
            </Box>
            <Box h="1px" bg="black"></Box>

            <Box
              h={height}
              w="full"
              bgGradient={teamBStyles.bgGradient}
              color={teamBStyles.color}
              textAlign={'Center'}
            >
              <Text
                textShadow={
                  teamBColor !== 'yellow'
                    ? '1px 1px 2px rgba(0, 0, 0, 0.8)'
                    : '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }
              >
                {teamBScore}
              </Text>
            </Box>
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}
BoxScore.propTypes = {
  teamScores: PropTypes.array.isRequired,
  teamAName: PropTypes.string.isRequired,
  teamAScore: PropTypes.number.isRequired,
  teamAColor: PropTypes.string.isRequired,
  teamBName: PropTypes.string.isRequired,
  teamBScore: PropTypes.number.isRequired,
  teamBColor: PropTypes.string.isRequired,
  end: PropTypes.number.isRequired,
  hammerState: PropTypes.oneOf(['A', 'B']).isRequired,
  spielGameType: PropTypes.string.isRequired,

  spielName: PropTypes.string.isRequired
}
