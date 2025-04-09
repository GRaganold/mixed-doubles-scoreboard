import { Button, HStack, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const Stopwatch = () => {
  // state to store time
  const [time, setTime] = useState(0)

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        // Numpad 4 key pressed
        startAndStop()
      } else if (
        event.key === '6' ||
        event.key === 'Digit6' ||
        event.key === 'Numpad6' ||
        event.key === 'ArrowRight'
      ) {
        // Numpad 6 key pressed
        reset()
      }
    }

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown)

    if (isRunning) {
      // setting time from 0 to 1 every 10 miliseconds using javascript setInterval method
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10)
    }

    return () => {
      clearInterval(intervalId)
      // Remove event listener on component unmount
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning])

  // Hours calculation
  const hours = Math.floor(time / 360000)

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000)

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100)

  // Milliseconds calculation
  const milliseconds = time % 100

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning)
  }

  // Method to reset timer back to 0
  const reset = () => {
    setIsRunning(false)
    setTime(0)
  }

  return (
    <VStack
      className="stopwatch-container"
      border="1px dotted black"
      paddingLeft={1}
      paddingRight={1}
    >
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}:
        {milliseconds.toString().padStart(2, '0')}
      </p>
      <HStack className="stopwatch-buttons" gap={1}>
        <Button
          className="stopwatch-button"
          bg={isRunning === true ? '#00aa86' : '#fd8050'}
          onClick={startAndStop}
          size={'sm'}
        >
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button className="stopwatch-button" bg="#303030" color="white" onClick={reset} size={'sm'}>
          Reset
        </Button>
      </HStack>
    </VStack>
  )
}

export default Stopwatch
