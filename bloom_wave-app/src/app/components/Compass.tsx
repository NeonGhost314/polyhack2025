import React from "react";

const Compass = ({ }) => {
    return (
        <div
            style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "50%",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    // transform: `rotate(${rotation}rad)`,
                    transition: "transform 0.2s ease",
                }}
            >
                <img
                    src="/compass.svg"
                    alt="Compass"
                    style={{ width: "70px", height: "70px" }}
                />
            </div>
        </div>
    );
};

export default Compass;
