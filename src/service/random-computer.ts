import { Chess } from "chess.js";
import { IComputerMove } from "../types";

/**
 * The `RandomMove` class implements the `IComputerMove` interface and provides
 * functionality to make a random valid move for the computer in a chess game.
 * it's purpose it to add modularity
 */
class RandomMove implements IComputerMove {

    /**
     * Generates and returns a random valid move for the computer in the given chess game.
     * This method is called to decide the computer's move.
     * 
     * @param {Chess} game - The current instance of the Chess game.
     * @returns {string | undefined} - The FEN (Forsyth–Edwards Notation) string representing
     * the new board position after the move, or `undefined` if no valid move is possible.
     */
    getMove(game: Chess): string | undefined {
        return this.makeRandomMove(game);
    }

    /**
     * Private method to calculate a random valid move from the list of possible moves.
     * 
     * @param {Chess} game - The current instance of the Chess game.
     * @returns {string | undefined} - The FEN string of the new board position, or `undefined` 
     * if the game is over, drawn, or no moves are available.
     */
    private makeRandomMove(game: Chess): string | undefined {
        let possibleMoves = game.moves();

        // Exit if the game is over or there are no possible moves
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
            return undefined;
        }

        // Select a random move from the available moves
        let randomIndex = Math.floor(Math.random() * possibleMoves.length);
        game.move(possibleMoves[randomIndex]);

        // Return the FEN string representing the new board position
        return game.fen();
    }
}

export { RandomMove };