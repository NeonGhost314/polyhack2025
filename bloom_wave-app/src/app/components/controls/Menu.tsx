import React from "react";

interface MenuProps {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ menuOpen, setMenuOpen }) => {
    return (
        <div
            style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                zIndex: 2,
            }}
        >
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    padding: "10px",
                    backgroundColor: "#333",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                ☰ Menu
            </button>

            {menuOpen && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "50px",
                        left: "0",
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        zIndex: 2,
                        minWidth: "150px",
                    }}
                >
                    <p
                        style={{
                            margin: "0",
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        Options
                    </p>
                    {["Option 1", "Option 2", "Option 3"].map(
                        (option, index) => (
                            <button
                                key={index}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    margin: "5px 0",
                                    backgroundColor: [
                                        "#007bff",
                                        "#28a745",
                                        "#dc3545",
                                    ][index],
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                {option}
                            </button>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;
