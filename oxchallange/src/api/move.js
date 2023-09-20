// src/api/move.js

export const makeMove = async (index) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to make move:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while making a move:", error);
    return null;
  }
};




