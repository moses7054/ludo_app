import { create } from "zustand";

type Token = {
  num: number;
  current_position: number;
  new_position: number;
  isClicked: boolean;
};

type Player = {
  turn: number;
  colour: string;
  token: Token[];
  canRoll: boolean;
  currentRollValue: number;
  isSixCount: number;
};

type GameState = {
  turn: number; // 0, 1, 2, 3
  players: Player[];
  initializePlayers: () => void;
  rollDice: () => void;
  selectToken: (playerIndex: number, tokenIndex: number) => void;
  moveToken: (playerIndex: number, tokenIndex: number) => void;
  nextTurn: () => void;
  resetTokenClicks: (playerIndex: number) => void;
};

export const useStore = create<GameState>((set, get) => ({
  turn: 0,
  players: [],

  initializePlayers: () => {
    const colors = ["red", "blue", "green", "yellow"];
    const initialPlayers: Player[] = colors.map((color, index) => ({
      turn: index,
      colour: color,
      token: Array.from({ length: 4 }, (_, tokenIndex) => ({
        num: tokenIndex,
        current_position: -1, // -1 means in home/base
        new_position: -1,
        isClicked: false,
      })),
      canRoll: index === 0, // First player can roll initially
      currentRollValue: 0,
      isSixCount: 0,
    }));

    set({ players: initialPlayers });
  },

  rollDice: () => {
    const { turn, players } = get();
    const currentPlayer = players[turn];

    if (!currentPlayer.canRoll) return;

    const rollValue = Math.floor(Math.random() * 6) + 1;

    set((state) => {
      const newPlayers = [...state.players];
      const player = newPlayers[turn];

      player.currentRollValue = rollValue;
      player.canRoll = false; // Can't roll again until action is taken

      // Handle six roll
      if (rollValue === 6) {
        player.isSixCount += 1;

        // If three consecutive sixes, forfeit turn
        if (player.isSixCount >= 3) {
          player.isSixCount = 0;
          // Move to next turn without allowing token selection
          return { ...state, players: newPlayers };
        }
      } else {
        player.isSixCount = 0;
      }

      // Calculate which tokens can move
      player.token.forEach((token) => {
        // Token can move if:
        // 1. It's out of home (position >= 0) and roll doesn't exceed board
        // 2. It's in home (position === -1) and roll is 6
        if (token.current_position >= 0) {
          token.new_position = token.current_position + rollValue;
        } else if (rollValue === 6) {
          token.new_position = 0; // Start position
        } else {
          token.new_position = -1; // Can't move
        }
      });

      return { ...state, players: newPlayers };
    });
  },

  selectToken: (playerIndex: number, tokenIndex: number) => {
    const { turn, players } = get();

    // Only current player can select tokens
    if (playerIndex !== turn) return;

    const player = players[playerIndex];
    const token = player.token[tokenIndex];

    // Can only select if token can actually move
    if (token.new_position === -1) return;

    set((state) => {
      const newPlayers = [...state.players];
      const currentPlayer = newPlayers[playerIndex];

      // Reset all token clicks for this player
      currentPlayer.token.forEach((t) => {
        t.isClicked = false;
      });

      // Set selected token as clicked
      currentPlayer.token[tokenIndex].isClicked = true;

      return { ...state, players: newPlayers };
    });
  },

  moveToken: (playerIndex: number, tokenIndex: number) => {
    const { turn } = get();

    if (playerIndex !== turn) return;

    set((state) => {
      const newPlayers = [...state.players];
      const player = newPlayers[playerIndex];
      const token = player.token[tokenIndex];

      if (!token.isClicked) return state;

      // Move the token
      token.current_position = token.new_position;
      token.isClicked = false;
      token.new_position = -1;

      // Check if player gets another turn (if they rolled a 6)
      const rolledSix = player.currentRollValue === 6;

      if (rolledSix && player.isSixCount < 3) {
        // Player gets another turn
        player.canRoll = true;
      } else {
        // Move to next player
        player.isSixCount = 0;

        // Find next player and enable their roll
        const nextTurn = (state.turn + 1) % 4;
        newPlayers[nextTurn].canRoll = true;

        return { ...state, players: newPlayers, turn: nextTurn };
      }

      return { ...state, players: newPlayers };
    });
  },

  nextTurn: () => {
    set((state) => {
      const newPlayers = [...state.players];

      // Disable current player's roll ability
      newPlayers[state.turn].canRoll = false;
      newPlayers[state.turn].isSixCount = 0;

      // Move to next turn
      const nextTurn = (state.turn + 1) % 4;
      newPlayers[nextTurn].canRoll = true;

      return { ...state, players: newPlayers, turn: nextTurn };
    });
  },

  resetTokenClicks: (playerIndex: number) => {
    set((state) => {
      const newPlayers = [...state.players];
      newPlayers[playerIndex].token.forEach((token) => {
        token.isClicked = false;
      });
      return { ...state, players: newPlayers };
    });
  },
}));
