import { useState, useEffect } from "react";

function App() {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [diceValue, setDiceValue] = useState(null);
  const [score, setScore] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [level, setLevel] = useState("easy");
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Load score from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    if (savedScore) {
      setScore(JSON.parse(savedScore));
    }
  }, []);

  // Set attempts based on difficulty level
  useEffect(() => {
    if (level === "easy") {
      setRemainingAttempts(10);
    } else if (level === "medium") {
      setRemainingAttempts(7);
    } else if (level === "hard") {
      setRemainingAttempts(5);
    }
  }, [level]);

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  // Generate a random number between min and max
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Handle dice roll
  const handleDiceRoll = () => {
    if (remainingAttempts > 0) {
      setIsRolling(true); // Start rolling animation
      setTimeout(() => {
        const rolledNumber = generateRandomNumber(1, 6);
        setDiceValue(rolledNumber);
        if (selectedNumber === rolledNumber) {
          setScore((prevScore) => prevScore + rolledNumber); // Add score only if selected number matches
        }
        setRemainingAttempts((prev) => prev - 1); // Decrease attempts
        setIsRolling(false); // Stop rolling animation after delay
      }, 500); // Wait for half a second before setting dice result to simulate roll animation
    }
  };

  // Dice images for each side
  const diceImages = [
    "https://opengameart.org/sites/default/files/side_1_pip.png",
    "https://opengameart.org/sites/default/files/side_2_pips.png",
    "https://opengameart.org/sites/default/files/side_3_pips.png",
    "https://opengameart.org/sites/default/files/side_4_pips.png",
    "https://opengameart.org/sites/default/files/side_5_pips.png",
    "https://opengameart.org/sites/default/files/side_6_pips.png",
  ];


  return (
    <>


    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-300 p-5">
      <div className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-xl w-full max-w-lg sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3">
        <img
          src="https://www.freepnglogos.com/uploads/dice-png/dice-png-images-are-download-crazypngm-crazy-png-images-download-24.png"
          alt="Dice"
          className="w-58 h-auto mb-5 transition-transform duration-300 hover:rotate-12 sm:w-32 md:w-40"
        />
        {/* Score Display */}
        <div className="text-center mb-5">
          <h1 className="text-6xl font-bold text-gray-800">{score}</h1>
          <p className="text-lg text-gray-600">Total Score</p>
        </div>

        {/* Level Selection */}
        <div className="text-lg text-gray-600 mb-5">
          <p>Choose Difficulty Level:</p>
          <div className="flex gap-4 mt-3">
            {["easy", "medium", "hard"].map((levelOption) => (
              <button
                key={levelOption}
                onClick={() => setLevel(levelOption)}
                className={`${
                  level === levelOption
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                } px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:text-white transition duration-300`}
              >
                {levelOption.charAt(0).toUpperCase() + levelOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Remaining Attempts */}
        <div className="text-center mb-5">
          <p className="text-lg text-gray-600">
            Remaining Attempts: {remainingAttempts}
          </p>
        </div>

        <p className="text-lg text-gray-600 mb-3">Select a Number</p>

        {/* Number Selection */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedNumber(num)}
              className={`${
                selectedNumber === num
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
              } w-14 h-14 text-2xl font-bold rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-700 hover:text-white`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Dice Roll Section */}
        <div className="flex flex-col items-center mt-5">
          <img
            src={diceValue ? diceImages[diceValue - 1] : diceImages[0]}
            alt="Dice"
            className={`w-28 cursor-pointer hover:rotate-12 transition-transform duration-300 ${
              isRolling ? "animate-spin" : ""
            }`}
            onClick={handleDiceRoll}
          />
          <p className="text-lg text-gray-600 mt-3">Click on the dice to roll</p>

          {/* Buttons */}
          <div className="mt-5 flex gap-4">
            <button
              onClick={() => {
                setScore(0);
                setRemainingAttempts(
                  level === "easy" ? 10 : level === "medium" ? 7 : 5
                );
              }}
              className="px-6 py-3 text-white font-semibold bg-black rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
            >
              Reset Game
            </button>
            <button
              onClick={() => setIsRulesModalOpen(true)}
              className="px-6 py-3 text-white font-semibold bg-black rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
            >
              Show Rules
            </button>

            <button
              onClick={() => setIsRecordModalOpen(true)}
              className="px-6 py-3 text-white font-semibold bg-black rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
            >
              Show Record
            </button>
          </div>
        </div>

        {/* Rules Modal */}
        {isRulesModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg shadow-xl w-11/12 sm:w-96">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Game Rules</h2>
              <p className="text-gray-700 mb-4">
                1. Select a number between 1 and 6.
                <br />
                2. Click on the dice to roll it.
                <br />
                3. If the rolled number matches your selected number, you earn points.
                <br />
                4. You have a limited number of attempts based on the difficulty level.
              </p>
              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="px-6 py-2 text-white font-semibold bg-black rounded-lg hover:bg-blue-400"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Record Modal */}
        {isRecordModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg shadow-xl w-11/12 sm:w-96">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Saved Score</h2>
              <p className="text-gray-700 mb-4">Your current saved score is: {score}</p>
              <button
                onClick={() => setIsRecordModalOpen(false)}
                className="px-6 py-2 text-white font-semibold bg-black rounded-lg hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

   </>
  );
}

export default App;
