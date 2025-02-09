import React from 'react';

interface ToolbarProps {
  isMarkerMode: boolean;
  toggleMarkerMode?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isMarkerMode, toggleMarkerMode }) => {
  return (
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-md z-10 flex gap-4">
      <div
        onClick={toggleMarkerMode}
        className={`
          p-3 rounded-full cursor-pointer transition-all duration-200 ease-in-out
          flex items-center justify-center
          ${isMarkerMode ? 'bg-blue-700 hover:bg-blue' : 'bg-blue-500 hover:bg-blue-600'}
        `}
        role="button"
        aria-label={isMarkerMode ? "Cancel marker placement" : "Add marker"}
      >
        <img
          src="/fishLogo.svg"
          alt="Add Marker"
          className="w-10 h-10"
        />
      </div>

      <div
        className="p-3 bg-green-500 hover:bg-green-600 rounded-full cursor-pointer transition-all duration-200 ease-in-out"
        role="button"
        aria-label="Toggle layers"
      >
        <img
          src="/pollutionSymbol.png"
          alt="Layers"
          className="w-10 h-10"
        />
      </div>

      <div
        className="p-3 bg-red-500 hover:bg-red-600 rounded-full cursor-pointer transition-all duration-200 ease-in-out"
        role="button"
        aria-label="Delete selected"
      >
        <img
          src="/currentLogo.svg"
          alt="Delete"
          className="w-10 h-10"
        />
      </div>
    </div>
  );
};

export default Toolbar;