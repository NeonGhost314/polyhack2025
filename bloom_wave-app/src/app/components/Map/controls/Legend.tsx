import React from "react";

const Legend = () => {
    const legendItems = [
        {
            src: "/fish.png",
            label: "Extinct Fish",
        },
        { src: "/pollutionSymbol.png", label: "Polluted Area" },
        {
            src: "wave.png",
            label: "Current",
        },
    ];
    return (
        <div
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                zIndex: 1,
            }}
        >
            <h2
                style={{
                    margin: "0 0 10px 0",
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "bold",
                }}
            >
                LEGEND
            </h2>
            {legendItems.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                        marginRight: "10px",
                    }}
                >
                    <img
                        src={item.src}
                        alt={`${item.label} Icon`}
                        style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                        }}
                    />
                    <span style={{ color: "black" }}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Legend;
