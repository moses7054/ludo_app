// Position mapping utility for Ludo board
export interface Position {
  x: number;
  y: number;
}

// Home base positions for each player (4 tokens per player)
// Positions are relative to the home base center positions
const HOME_POSITIONS: Record<number, Position[]> = {
  0: [
    // Red - top-left
    { x: 78, y: 80 },
    { x: 142, y: 80 },
    { x: 78, y: 145 },
    { x: 142, y: 145 },
  ],
  1: [
    // Green - top-right
    { x: 600 - 78 - 20, y: 80 },
    { x: 600 - 142 - 20, y: 80 },
    { x: 600 - 78 - 20, y: 145 },
    { x: 600 - 142 - 20, y: 145 },
  ],
  2: [
    // Yellow - bottom-right
    { x: 600 - 78 - 20, y: 600 - 80 - 20 },
    { x: 600 - 78 - 20, y: 600 - 145 - 20 },
    { x: 600 - 142 - 20, y: 600 - 80 - 20 },
    { x: 600 - 142 - 20, y: 600 - 145 - 20 },
  ],
  3: [
    // Blue - bottom-left
    { x: 78, y: 600 - 80 - 20 },
    { x: 78, y: 600 - 145 - 20 },
    { x: 142, y: 600 - 80 - 20 },
    { x: 142, y: 600 - 145 - 20 },
  ],
};

// Board path positions (0-51 around the board)
// Fixed to follow proper Ludo movement patterns
const BOARD_PATH_POSITIONS: Position[] = [
  // Red player section: moves RIGHT from starting position
  { x: 55, y: 255 }, // 0 - Red start
  { x: 95, y: 255 }, // 1 - Moving right
  { x: 135, y: 255 }, // 2 - Moving right
  { x: 175, y: 255 }, // 3 - Moving right
  { x: 215, y: 255 }, // 4 - Moving right
  { x: 255, y: 255 }, // 5 - Moving right

  // Turning corner, moving DOWN
  { x: 295, y: 255 }, // 6
  { x: 335, y: 255 }, // 7
  { x: 335, y: 295 }, // 8 - Turning down
  { x: 335, y: 335 }, // 9 - Moving down
  { x: 335, y: 375 }, // 10 - Moving down
  { x: 335, y: 415 }, // 11 - Moving down
  { x: 335, y: 455 }, // 12 - Moving down

  // Green player section: moves DOWN from starting position
  { x: 335, y: 55 }, // 13 - Green start
  { x: 335, y: 95 }, // 14 - Moving down
  { x: 335, y: 135 }, // 15 - Moving down
  { x: 335, y: 175 }, // 16 - Moving down
  { x: 335, y: 215 }, // 17 - Moving down
  { x: 335, y: 255 }, // 18 - Moving down

  // Continuing GREEN path, turning LEFT
  { x: 375, y: 255 }, // 19 - Moving right first
  { x: 415, y: 255 }, // 20
  { x: 455, y: 255 }, // 21
  { x: 495, y: 255 }, // 22
  { x: 535, y: 255 }, // 23
  { x: 535, y: 295 }, // 24 - Turning down
  { x: 535, y: 335 }, // 25 - Moving down

  // Yellow player section: moves LEFT from starting position
  { x: 535, y: 335 }, // 26 - Yellow start
  { x: 495, y: 335 }, // 27 - Moving left
  { x: 455, y: 335 }, // 28 - Moving left
  { x: 415, y: 335 }, // 29 - Moving left
  { x: 375, y: 335 }, // 30 - Moving left
  { x: 335, y: 335 }, // 31 - Moving left

  // Continuing YELLOW path, turning UP
  { x: 295, y: 335 }, // 32 - Moving left
  { x: 255, y: 335 }, // 33 - Moving left
  { x: 255, y: 375 }, // 34 - Turning down
  { x: 255, y: 415 }, // 35 - Moving down
  { x: 255, y: 455 }, // 36 - Moving down
  { x: 255, y: 495 }, // 37 - Moving down
  { x: 255, y: 535 }, // 38 - Moving down

  // Blue player section: moves UP from starting position
  { x: 255, y: 535 }, // 39 - Blue start
  { x: 255, y: 495 }, // 40 - Moving up
  { x: 255, y: 455 }, // 41 - Moving up
  { x: 255, y: 415 }, // 42 - Moving up
  { x: 255, y: 375 }, // 43 - Moving up
  { x: 255, y: 335 }, // 44 - Moving up

  // Continuing BLUE path, turning RIGHT
  { x: 215, y: 335 }, // 45 - Moving left
  { x: 175, y: 335 }, // 46 - Moving left
  { x: 135, y: 335 }, // 47 - Moving left
  { x: 95, y: 335 }, // 48 - Moving left
  { x: 55, y: 335 }, // 49 - Moving left
  { x: 55, y: 295 }, // 50 - Turning up
  { x: 55, y: 255 }, // 51 - Back to Red start
];

// Player starting positions on the board
const PLAYER_START_POSITIONS = [0, 13, 26, 39]; // Red, Green, Yellow, Blue

export function getTokenPosition(
  playerIndex: number,
  tokenIndex: number,
  currentPosition: number
): Position {
  // If token is in home (position -1)
  if (currentPosition === -1) {
    return HOME_POSITIONS[playerIndex][tokenIndex];
  }

  // Calculate actual board position based on player's starting point
  const playerStartPos = PLAYER_START_POSITIONS[playerIndex];
  const actualBoardPosition = (playerStartPos + currentPosition) % 52;

  return BOARD_PATH_POSITIONS[actualBoardPosition] || { x: 0, y: 0 };
}

export function isTokenClickable(
  playerIndex: number,
  currentTurn: number,
  newPosition: number
): boolean {
  return playerIndex === currentTurn && newPosition !== -1;
}
