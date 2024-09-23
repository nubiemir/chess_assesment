import { Chess, Square } from "chess.js";

/**
 * Generates a style object for highlighting squares on the chessboard based on the possible moves
 * for a piece at a given square.
 * 
 * @param {Chess} game - The current instance of the Chess game.
 * @param {Square} square - The square from which the piece is moved.
 * @returns {Record<string, React.CSSProperties>} - An object where each key is a square and each value is
 * a CSS style object for highlighting that square. The style will differ for potential move squares and
 * squares where pieces can be captured.
 */
export const onMouseSquareClick = (game: Chess, square: Square) => {
  // Get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  });

  // Exit if there are no moves available for this square
  if (moves.length === 0) return;

  // Define the styles for highlighting squares
  const squares = {
    from: moves[0].from,
    to: moves.map(item => item.to),
    san: moves.filter(item => item.san.includes("x"))
  };

  // Styles for non-capturing moves
  const highlightStyles = squares.to.reduce(
    (a, c) => ({
      ...a,
      [c]: {
        background: "radial-gradient(circle, #CBCBB2 25%, transparent 20%)",
        borderRadius: "50%",
      },
    }),
    {}
  );

  // Styles for capturing moves
  const capturedHighlightStyles = squares.san.reduce(
    (a, c) => ({
      ...a,
      [c.to]: {
        background: "radial-gradient(circle, #CBCBB2 100%, transparent 20%)",
        borderRadius: "50%",
      },
    }),
    {}
  );

  return {
    [squares.from]: {
      backgroundColor: "#F5F682",
    },
    ...highlightStyles,
    ...capturedHighlightStyles
  };
};

/**
 * Moves a piece on the chessboard and returns the new board position in FEN (Forsyth-Edwards Notation).
 * 
 * @param {Chess} game - The current instance of the Chess game.
 * @param {string} from - The starting square of the move (e.g., 'e2').
 * @param {string} to - The target square of the move (e.g., 'e4').
 * @returns {string | undefined} - The new board position in FEN if the move was successful, or `undefined` if the move was invalid.
 */
export const onPieceMove = (game: Chess, from: string, to: string) => {
  try {
    game.move({
      from,
      to,
      promotion: "q" // Automatically promote to a queen if a pawn reaches the opposite side
    });

    return game.fen(); // Return the new board position in FEN
  } catch (err) {
    // Return undefined if an invalid move is attempted
    return;
  }
};
