// Signal.js
class Signal {
    constructor(coordinates, type, description) {
      this.coordinates = coordinates;
      this.type = type;
      this.description = description;
    }

    async sendToServer() {
      try {
        const response = await fetch("http://127.0.0.1:5000/signals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: this.coordinates,
            type: this.type,
            description: this.description,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send data to server");
        }

        const data = await response.json();
        console.log("Signal sent successfully:", data);
      } catch (error) {
        console.error("Error sending signal:", error);
      }
    }
  }

  export default Signal;  // Exporting the Signal class