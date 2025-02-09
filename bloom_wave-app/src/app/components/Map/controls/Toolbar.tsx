import React from 'react';

const Toolbar = ({ isMarkerMode, toggleMarkerMode }: { isMarkerMode?: boolean; toggleMarkerMode?: () => void }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        zIndex: 1,
        display: "flex",
        gap: "10px",
      }}
    >
      <button
        onClick={toggleMarkerMode}
        style={{
          padding: "8px 16px",
          backgroundColor: isMarkerMode ? "#0056b3" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          height: "7vh",
          width: "16vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px"
        }}
      >
        <img
          src="https://openlayers.org/en/latest/examples/data/icon.png"
          alt="Marker"
          style={{ width: "20px", height: "20px" }}
        />
        {isMarkerMode ? "Cancel" : "Add Marker"}
      </button>
      <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          height: "7vh",
          width: "16vh"
        }}
      >
        Button 2
      </button>
      <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          height: "7vh",
          width: "16vh"
        }}
      >
        Button 3
      </button>
    </div>
  );
};

export default Toolbar;