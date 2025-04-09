import { useState, useEffect } from 'react'
import { Flex, Box, HStack } from '@chakra-ui/react'
import ControlPanel from './ControlPanel'
import VerticalScoreboard from './VerticalScoreboard'
import BoxScore from './BoxScore'


export default function App() {
  const [hammerState, setHammerState] = useState('A')
  const [teamAName, setTeamAName] = useState('Team B Name')
  const [spielName, setSpielName] = useState('Mixed Doubles Championships')
  const [spielGameType, setSpielGameType] = useState('')
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamAColor, setTeamAColor] = useState('red')
  const [teamARockCountState, setTeamARockCountState] = useState("")

  const [teamBName, setTeamBName] = useState('Team B Name')
  const [teamBScore, setTeamBScore] = useState(0)
  const [teamBColor, setTeamBColor] = useState('yellow')
  const [teamBRockCountState, setTeamBRockCountState] = useState("")
  const [end, setEnd] = useState(1)
  const [gameRockCountState, setGameRockCountState] = useState("")

  const [loadedFromStorage, setLoadedFromStorage] = useState(false) // 👈

  // Load from localStorage
  useEffect(() => {
    const storedTeamAName = localStorage.getItem('teamAName')
    const storedTeamBName = localStorage.getItem('teamBName')
    const storedHammerState = localStorage.getItem('hammerState')

    const storedTeamAScore = localStorage.getItem('teamAScore')
    const storedTeamAColor = localStorage.getItem('teamAColor')
    const storedTeamARockCountState = localStorage.getItem('teamARockCountState')

    const storedTeamBScore = localStorage.getItem('teamBScore')
    const storedTeamBColor = localStorage.getItem('teamBColor')
    const storedTeamBRockCountState = localStorage.getItem('teamBRockCountState')

    const storedEnd = localStorage.getItem('end')
    const storedSpielName = localStorage.getItem('spielName')


    if (storedTeamAName) setTeamAName(storedTeamAName)
    if (storedTeamBName) setTeamBName(storedTeamBName)
    if (storedHammerState) setHammerState(storedHammerState)

    if (storedTeamAScore) setTeamAScore(Number(storedTeamAScore))
    if (storedTeamAColor) setTeamAColor(storedTeamAColor)
    if (storedTeamARockCountState) setTeamARockCountState(Number(storedTeamARockCountState))

    if (storedTeamBScore) setTeamBScore(Number(storedTeamBScore))
    if (storedTeamBColor) setTeamBColor(storedTeamBColor)
    if (storedTeamBRockCountState) setTeamBRockCountState(Number(storedTeamBRockCountState))

    if (storedEnd) setEnd(Number(storedEnd))
    if (storedSpielName) setSpielName(storedSpielName)

    

    setLoadedFromStorage(true) // ✅ localStorage is now safe to write
  }, [])

  // Save to localStorage — only after loading is complete
  useEffect(() => {
    if (!loadedFromStorage) return

    localStorage.setItem('teamAName', teamAName)
    localStorage.setItem('teamBName', teamBName)
    localStorage.setItem('hammerState', hammerState)

    localStorage.setItem('teamAScore', String(teamAScore))
    localStorage.setItem('teamAColor', teamAColor)
    localStorage.setItem('teamARockCountState', String(teamARockCountState))

    localStorage.setItem('teamBScore', String(teamBScore))
    localStorage.setItem('teamBColor', teamBColor)
    localStorage.setItem('teamBRockCountState', String(teamBRockCountState))

    localStorage.setItem('end', String(end))
    localStorage.setItem('spielName', String(spielName))

  }, [
    teamAName,
    teamBName,
    hammerState,
    teamAScore,
    teamAColor,
    teamARockCountState,
    teamBScore,
    teamBColor,
    teamBRockCountState,
    end,
    spielName,

    loadedFromStorage // include to ensure effect respects load order
  ])

  console.log(spielName)
  const [teamScores, setTeamScores] = useState([
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

  return (
    <Flex minH="100vh" bg="#00ff00" justifyContent="center" fontFamily={'sans-serif'}>
      <Box color="white" p={2} w="full">
        <HStack spacing={50}>
          <VerticalScoreboard
            teamAName={teamAName}
            teamAScore={teamAScore}
            teamAColor={teamAColor}
            teamARockCountState={teamARockCountState}
            teamBName={teamBName}
            teamBScore={teamBScore}
            teamBColor={teamBColor}
            teamBRockCountState={teamBRockCountState}
            end={end}
            hammerState={hammerState}
            spielGameType={spielGameType}
            setSpielGameType={setSpielGameType}
            setSpielName={setSpielName}
            spielName={spielName}
            gameRockCountState={gameRockCountState}
          />
        </HStack>

        <br />
        <BoxScore
          id="BoxScore"
          teamAName={teamAName}
          teamAScore={teamAScore}
          teamAColor={teamAColor}
          teamARockCountState={teamARockCountState}
          teamBName={teamBName}
          teamBScore={teamBScore}
          teamBColor={teamBColor}
          teamBRockCountState={teamBRockCountState}
          end={end}
          hammerState={hammerState}
          teamScores={teamScores}
          setTeamScores={setTeamScores}
          spielGameType={spielGameType}
          setSpielGameType={setSpielGameType}
          setSpielName={setSpielName}
          spielName={spielName}
        /> 
        <br />
        <ControlPanel
          teamAName={teamAName}
          setTeamAName={setTeamAName}
          teamBName={teamBName}
          setTeamBName={setTeamBName}
          hammerState={hammerState}
          setHammerState={setHammerState}
          teamAScore={teamAScore}
          setTeamAScore={setTeamAScore}
          teamAColor={teamAColor}
          setTeamAColor={setTeamAColor}
          teamARockCountState={teamARockCountState}
          setTeamARockCountState={setTeamARockCountState}
          teamBScore={teamBScore}
          setTeamBScore={setTeamBScore}
          teamBColor={teamBColor}
          setTeamBColor={setTeamBColor}
          teamBRockCountState={teamBRockCountState}
          setTeamBRockCountState={setTeamBRockCountState}
          end={end}
          setEnd={setEnd}
          teamScores={teamScores}
          setTeamScores={setTeamScores}
          spielGameType={spielGameType}
          setSpielGameType={setSpielGameType}
          setSpielName={setSpielName}
          spielName={spielName}
          gameRockCountState={gameRockCountState}
          setGameRockCountState={setGameRockCountState} 
        />
      </Box> 
    </Flex>
   
  )
}
