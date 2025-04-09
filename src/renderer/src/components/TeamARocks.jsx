/* eslint-disable react/prop-types */
import { Box, Flex, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Circle icon component
const CircleIcon = props => (
	<Icon viewBox="0 0 200 200" {...props}>
		<defs>
			<linearGradient id="black-gray-black" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" style={{ stopColor: "#303030", stopOpacity: 1 }} />
				<stop offset="50%" style={{ stopColor: "#707070", stopOpacity: 1 }} />
				<stop offset="100%" style={{ stopColor: "#909090", stopOpacity: 1 }} />
			</linearGradient>
		</defs>
		<path
			stroke={props.stroke}
			strokeWidth="28"
			fill={props.color}
			d="M 100, 100 m -75, 0 a 50,50 0 1,0 150,0 a 75,75 0 1,0 -150,0"
		/>
	</Icon>
);

// Constants
const boxSize = "8";
const flashInterval = 1000; // Flash every 1 seconds

// Hammer team component
function WithHammerTeamA({ teamBRockCountState, teamARockCountState, teamAColor, hammerState,gameRockCountState }) {
	const [highlightedRockWithHammer, setHighlightedRockWithHammer] = useState(-1);

	useEffect(() => {
		if (hammerState === "A" && (teamARockCountState + teamBRockCountState) % 2 !== 0) {
			const intervalId = setInterval(() => {
				setHighlightedRockWithHammer(prev =>
					prev === -1 ? teamARockCountState - 1 : -1
				);
			}, flashInterval);
			return () => clearInterval(intervalId);
		}
	}, [teamBRockCountState, hammerState, teamARockCountState]);

	return (
		<>
			{Array.from({ length: teamARockCountState }, (_, index) => (
				<Box key={index} borderLeft={
					gameRockCountState === 5 ? (index !== 0 && index !== 3 && index !== 2 ? "2px solid gray" : undefined) : 
					(index !== 0 && index !== 1 && index !== 3 && index !== 5 && index !== 7 ? "2px solid gray" : undefined)
				}>
					<Flex borderRadius={0} m="1px">
						<CircleIcon
							boxSize={boxSize}
							color={
								index === highlightedRockWithHammer ? "transparent" : teamAColor
							}
							stroke={
								index === highlightedRockWithHammer
									? "transparent"
									: "url(#black-gray-black)"
							}
						/>
					</Flex>
				</Box>
			))}
		</>
	);
}

// Non-hammer team component
function WithoutHammerTeamA({ teamBRockCountState, teamARockCountState, teamAColor, hammerState,gameRockCountState }) {
	const [highlightedRockWithHammer, setHighlightedRockWithHammer] = useState(-1);

	useEffect(() => {
		if (hammerState === "B" && (teamARockCountState + teamBRockCountState) % 2 === 0) {
			const intervalId = setInterval(() => {
				setHighlightedRockWithHammer(prev =>
					prev === -1 ? teamARockCountState - 1 : -1
				);
			}, flashInterval);
			return () => clearInterval(intervalId);
		}
	}, [teamBRockCountState, hammerState, teamARockCountState]);

	return (
		<>
			{Array.from({ length: teamARockCountState }, (_, index) => (
				<Box key={index} borderLeft={
					gameRockCountState === 5 ? (index !== 0 && index !== 3 && index !== 2 ? "2px solid gray" : undefined) : 
					(index !== 0 && index !== 1 && index !== 3 && index !== 5 && index !== 7 ? "2px solid gray" : undefined)
				}>
					<Flex borderRadius={0} m="1px">
						<CircleIcon
							boxSize={boxSize}
							color={
								index === highlightedRockWithHammer ? "transparent" : teamAColor
							}
							stroke={
								index === highlightedRockWithHammer
									? "transparent"
									: "url(#black-gray-black)"
							}
						/>
					</Flex>
				</Box>
			))}
		</>
	);
}

// Top-level rock row display
export default function TeamARocks({
	teamBRockCountState,
	teamBColor,
	teamARockCountState,
	teamAColor,
	hammerState, gameRockCountState }) {
		// Debugging the state value
		useEffect(() => {
			console.log('gameRockCountState has changed:', gameRockCountState);
		}, [gameRockCountState]); // Track changes to gameRockCountState
	return (
		<Flex
			direction="row"
			justify="start"
			align="center"
			bgGradient="linear(to bottom, #fff 50%, #c2c2c2 60%, #8a8a8a 100%)"
			h="49.9px"
			border="2px solid black"
			borderBottom="1px solid black"
			pl="20px"
		>
			{hammerState === "A" ? (
				<WithHammerTeamA
					teamBRockCountState={teamBRockCountState}
					teamARockCountState={teamARockCountState}
					teamAColor={teamAColor}
					teamBColor={teamBColor}
					hammerState={hammerState}
					gameRockCountState={gameRockCountState}
				/>
			) : (
				<WithoutHammerTeamA
					teamBRockCountState={teamBRockCountState}
					teamARockCountState={teamARockCountState}
					teamAColor={teamAColor}
					teamBColor={teamBColor}
					hammerState={hammerState}
					gameRockCountState={gameRockCountState}
				/>
			)}
		</Flex>
	);
}
