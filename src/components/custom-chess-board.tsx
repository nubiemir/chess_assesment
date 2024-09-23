import React from "react";
import { TBoardColors } from "../constants";

// Define the props interface for the CustomChessBoard component
interface ICustomChessBoard {
    boardColor: TBoardColors; // Color for the chessboard squares
}

// Define the color classes for different board colors
const COLORS = {
    green: 'bg-green-400',
    gray: 'bg-gray-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    sky: 'bg-sky-400'
} as const;

// Number of rows and columns in the chessboard
const rows = 2;
const columns = 8;

/**
 * CustomChessBoard component renders a chessboard with customizable colors.
 * 
 * @param {ICustomChessBoard} props - The component props.
 * @param {TBoardColors} props.boardColor - The color to use for the dark squares of the chessboard.
 * @returns {JSX.Element} - A JSX element representing the chessboard.
 */
const CustomChessBoard: React.FC<ICustomChessBoard> = ({ boardColor }) => {
    // Get the color class based on the boardColor prop
    const color = COLORS[boardColor];

    // Function to create the chessboard layout
    const createChessBoard = () => {
        const board = [];
        for (let row = 0; row < rows; row++) {
            const rowSquares = [];
            for (let col = 0; col < columns; col++) {
                // Determine if the square is dark or light based on its position
                const isDarkSquare = (row + col) % 2 === 0;
                rowSquares.push(
                    <div
                        key={`${row}-${col}`}
                        className={`w-16 h-16 ${isDarkSquare ? color : 'bg-gray-200'}`}
                    ></div>
                );
            }
            board.push(
                <div key={row} className="flex">
                    {rowSquares}
                </div>
            );
        }
        return board;
    };

    return <div className="flex flex-col">{createChessBoard()}</div>;
};

export default CustomChessBoard;
