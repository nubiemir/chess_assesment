import { Chess } from "chess.js";

/**
 * `IComputerMove` defines the structure for implementing computer move algorithms in a chess game.
 * Any class that implements this interface must provide a `getMove` method, which generates 
 * a move for the computer.
 */
export interface IComputerMove {

    /**
     * Generates a move for the computer based on the current game state.
     * 
     * @param {Chess} game - The current instance of the Chess game.
     * @returns {string | undefined} - The FEN (Forsyth–Edwards Notation) string representing
     * the new board position after the computer's move, or `undefined` if no valid move is possible.
     */
    getMove: (game: Chess) => string | undefined;
}
