import React, { useState } from "react";

interface ToolbarProps {
    isMarkerMode: boolean;
    toggleMarkerMode?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    isMarkerMode,
    toggleMarkerMode,
}) => {
    const [isPollutionMode, setPollutionMode] = useState(false);
    const [isCurrentMode, setCurrentMode] = useState(false);
    const [isFishMode, setFishMode] = useState(false);

    const handleFishMode = () => {
        if (toggleMarkerMode) toggleMarkerMode();
        setPollutionMode(false);
        setCurrentMode(false);
    };

    const handlePollutionMode = () => {
        setPollutionMode(!isPollutionMode);
        if (toggleMarkerMode) toggleMarkerMode();
        setCurrentMode(false);
        setFishMode(false);
    };

    const handleCurrentMode = () => {
        setCurrentMode(!isCurrentMode);
        if (toggleMarkerMode) toggleMarkerMode();
        setPollutionMode(false);
        setFishMode(false);

    };

    return (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-sm p-4 rounded-2xl shadow-lg z-10 flex gap-6">
            <div
                onClick={handleFishMode}
                className={`
          group
          relative
          p-4
          rounded-xl
          cursor-pointer
          transition-all
          duration-300
          ease-in-out
          flex
          items-center
          justify-center
          hover:scale-110
          hover:shadow-xl
          ${
            isFishMode
                  ? "bg-blue-600/75 hover:bg-blue-700/90 shadow-blue-500/50"
                  : "bg-blue-500/75 hover:bg-blue-600/90"
          }
          before:content-['']
          before:absolute
          before:inset-0
          before:rounded-xl
          before:bg-gradient-to-t
          before:from-transparent
          before:to-white/20
          before:opacity-0
          hover:before:opacity-100
          before:transition-opacity
          before:duration-300
        `}
                role="button"
                aria-label={
                    isFishMode ? "Cancel marker placement" : "Add marker"
                }
            >
                <img
                    src="/fish.png"
                    alt="Add Marker"
                    className="w-10 h-10 transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm whitespace-nowrap bg-black/75 px-2 py-1 rounded-md">
                    {isFishMode ? "Cancel" : "Add Fish"}
                </div>
            </div>

            <div
                onClick={handlePollutionMode}
                className={`
          group
          relative
          p-4
          rounded-xl
          cursor-pointer
          transition-all
          duration-300
          ease-in-out
          flex
          items-center
          justify-center
          hover:scale-110
          ${
              isPollutionMode
                  ? "bg-green-600/75 hover:bg-green-700/90 shadow-green-500/50"
                  : "bg-green-500/75 hover:bg-green-600/90"
          }
          hover:shadow-xl
          before:content-['']
          before:absolute
          before:inset-0
          before:rounded-xl
          before:bg-gradient-to-t
          before:from-transparent
          before:to-white/20
          before:opacity-0
          hover:before:opacity-100
          before:transition-opacity
          before:duration-300
        `}
                role="button"
                aria-label="Pollution"
            >
                <img
                    src="/pollutionSymbol.png"
                    alt="Pollution"
                    className="w-10 h-10 transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm whitespace-nowrap bg-black/75 px-2 py-1 rounded-md">
                    {isPollutionMode ? "Cancel" : "Add Pollution"}
                </div>
            </div>

            <div
                onClick={handleCurrentMode}
                className={`
          group
          relative
          p-4
          rounded-xl
          cursor-pointer
          transition-all
          duration-300
          ease-in-out
          flex
          items-center
          justify-center
          hover:scale-110
          ${
              isCurrentMode
                  ? "bg-red-600/75 hover:bg-red-700/90 shadow-red-500/50"
                  : "bg-red-500/75 hover:bg-red-600/90"
          }
          hover:shadow-xl
          before:content-['']
          before:absolute
          before:inset-0
          before:rounded-xl
          before:bg-gradient-to-t
          before:from-transparent
          before:to-white/20
          before:opacity-0
          hover:before:opacity-100
          before:transition-opacity
          before:duration-300
        `}
                role="button"
                aria-label="Current"
            >
                <img
                    src="/wave.png"
                    alt="Current"
                    className="w-10 h-10 transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm whitespace-nowrap bg-black/75 px-2 py-1 rounded-md">
                    {isCurrentMode ? "Cancel" : "Add Current"}
                </div>
            </div>
        </div>
    );
};

export default Toolbar;
