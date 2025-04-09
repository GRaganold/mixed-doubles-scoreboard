/* eslint-disable react/prop-types */
import { Box, Flex, Icon } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const CircleIcon = props => (
	<Icon viewBox="0 0 200 200" {...props}>
		<defs>
			<linearGradient id="black-gray-black" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" style={{ stopColor: "#303030", stopOpacity: 1 }} />
				<stop offset="50%" style={{ stopColor: "#707070", stopOpacity: 1 }} />
				<stop offset="100%" style={{ stopColor: "#909090", stopOpacity: 1 }} />
			</linearGradient>
		</defs>
		<path stroke={props.stroke} strokeWidth="28" fill={props.color} d="M 100, 100 m -75, 0 a 50,50 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
	</Icon>
)

const boxSize = "8"
const flashInterval = 1000; // Flash every 1 second

function WithHammerTeamB({ teamBRockCountState, teamBColor, teamARockCountState, hammerState, gameRockCountState }) {
	const [highlightedRockWithHammer, setHighlightedRockWithHammer] = useState(-1)
	useEffect(() => {
		console.log('gameRockCountState has changed:', gameRockCountState);
	}, [gameRockCountState]); // Track changes to gameRockCountState

	useEffect(() => {
		// Toggle colors every second
		const intervalId = setInterval(() => {
			setHighlightedRockWithHammer(prevRock => (prevRock === -1 && hammerState === "B" && (teamBRockCountState + teamARockCountState) % 2 !== 0 ? teamBRockCountState - 1 : -1))
		}, flashInterval)

		// Cleanup the interval on component unmount
		return () => clearInterval(intervalId)
	}, [teamARockCountState, hammerState, teamBRockCountState])

	return (
		<>
			{Array.from({ length: teamBRockCountState }, (_, index) => (
				<Box key={index} borderLeft={
					gameRockCountState === 5 ? (index !== 0 && index !== 3 && index !== 2 ? "2px solid gray" : undefined) : 
					(index !== 0 && index !== 1 && index !== 3 && index !== 5 && index !== 7 ? "2px solid gray" : undefined)
				}>
					<Flex borderRadius={0} key={index} m="1px">
						<CircleIcon
							boxSize={boxSize}
							color={index === highlightedRockWithHammer ? (hammerState === "A" ? "transparent" : "transparent") : teamBColor}
							stroke={index === highlightedRockWithHammer ? (hammerState === "A" ? "transparent" : "transparent") : "url(#black-gray-black)"}
						/>
					</Flex>
				</Box>
			))}
		</>
	)
}
function WithoutHammerTeamB({ teamBRockCountState, teamBColor, teamARockCountState, hammerState,gameRockCountState }) {
	const [highlightedRockWithHammer, setHighlightedRockWithHammer] = useState(-1)

	useEffect(() => {
		// Toggle colors every second
		const intervalId = setInterval(() => {
			setHighlightedRockWithHammer(prevRock => (prevRock === -1 && hammerState === "A" && (teamBRockCountState + teamARockCountState) % 2 === 0 ? teamBRockCountState - 1 : -1))
		}, flashInterval)

		// Cleanup the interval on component unmount
		return () => clearInterval(intervalId)
	}, [teamARockCountState, hammerState, teamBRockCountState])

	return (
		<>
			{Array.from({ length: teamBRockCountState }, (_, index) => (
				<Box key={index} borderLeft={
					gameRockCountState === 5 ? (index !== 0 && index !== 3 && index !== 2 ? "2px solid gray" : undefined) : 
					(index !== 0 && index !== 1 && index !== 3 && index !== 5 && index !== 7 ? "2px solid gray" : undefined)
				}>
					<Flex borderRadius={0} key={index} m="1px">
						<CircleIcon
							key={index}
							boxSize={boxSize}
							color={index === highlightedRockWithHammer ? (hammerState === "A" ? "transparent" : "transparent") : teamBColor}
							stroke={index === highlightedRockWithHammer ? (hammerState === "A" ? "transparent" : "transparent") : "url(#black-gray-black)"}
						/>
					</Flex>
				</Box>
			))}
		</>
	)
}


function TeamBRocks({ teamBRockCountState, teamBColor, teamARockCountState, teamAColor, hammerState, gameRockCountState }) {
	// Debugging the state value
	useEffect(() => {
		console.log('gameRockCountState has changed:', gameRockCountState);
	}, [gameRockCountState]); // Track changes to gameRockCountState

	return (
		<>

			{console.log("Rendering TeamBRocks with gameRockCountState:", gameRockCountState)}

			{/* Check if gameRockCountState is exactly 5 */}
			
				<Flex
					direction={"row"}
					justify={"start"}
					align={"center"}
					bgGradient="linear(to bottom, #fff 50%, #c2c2c2 60%, #8a8a8a 100%)"
					h="49.9px"
					border="2px solid black"
					borderTop="1px solid black"
					pl="20px"
				>
					{hammerState === "B" ? (
						<WithHammerTeamB
							teamBRockCountState={teamBRockCountState}
							teamBColor={teamBColor}
							teamARockCountState={teamARockCountState}
							teamAColor={teamAColor}
							hammerState={hammerState}
							gameRockCountState={gameRockCountState}
						/>
					) : (
						<WithoutHammerTeamB
							teamBRockCountState={teamBRockCountState}
							teamBColor={teamBColor}
							teamARockCountState={teamARockCountState}
							teamAColor={teamAColor}
							hammerState={hammerState}
							gameRockCountState={gameRockCountState}
						/>
					)}
				</Flex>
		</>
	)
}

export default TeamBRocks;
