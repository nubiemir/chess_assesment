import { faComputer, faFlag, faPerson, faReply, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";

// Define the props interface for the GameHistoryWindow component
interface IGameHistoryWindowProps {
    handleOpenSetting: () => void; // Function to handle opening the settings modal
    handleResign: () => void; // Function to handle resigning from the game
    data: string[]; // Array of game history entries to be displayed
    isGameOver: boolean; // Boolean indicating if the game is over
    resetGame: () => void; // Function to reset the game
}

/**
 * GameHistoryWindow component displays the game history and provides controls for settings, resigning, and resetting the game.
 * 
 * @param {IGameHistoryWindowProps} props - The component props.
 * @param {() => void} props.handleOpenSetting - Function to handle opening the settings modal.
 * @param {() => void} props.handleResign - Function to handle resigning from the game.
 * @param {string[]} props.data - Array of game history entries to be displayed.
 * @param {boolean} props.isGameOver - Boolean indicating if the game is over.
 * @param {() => void} props.resetGame - Function to reset the game.
 * @returns {JSX.Element} - A JSX element representing the game history window with controls.
 */
const GameHistoryWindow: React.FC<IGameHistoryWindowProps> = ({
    handleOpenSetting,
    handleResign,
    resetGame,
    data,
    isGameOver
}) => {
    return (
        <div className="card bg-base-200 h-full">
            <div className="card-body p-3 px-6 min-h-[300px]">
                <h2 className="card-title">Game History</h2>
                <ul className="steps steps-vertical max-h-[250px] md:max-h-[300px] overflow-y-auto">
                    {data.map((item, idx) => (
                        <li className="step step-primary" key={idx}>
                            <div className="flex gap-4 items-center">
                                <FontAwesomeIcon icon={idx % 2 === 0 ? faPerson : faComputer} />
                                <h3>{item}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-12">
                <div className="bg-base-300 h-full">
                    <div className="flex justify-between px-4 items-center h-full">
                        <div className="flex gap-4">
                            <button onClick={handleOpenSetting}>
                                <FontAwesomeIcon icon={faSliders} />
                            </button>
                            {isGameOver && (
                                <button onClick={resetGame}>
                                    <FontAwesomeIcon icon={faReply} />
                                </button>
                            )}
                        </div>
                        {!isGameOver && (
                            <button onClick={handleResign}>
                                <FontAwesomeIcon icon={faFlag} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(GameHistoryWindow);
