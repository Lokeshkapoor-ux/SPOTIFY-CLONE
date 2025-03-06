import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

// Debounce function to limit requests
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default function Volume() {
  const [{ token }] = useStateProvider();
  const [volume, setVolumeState] = useState(50); // Default volume state

  const setVolume = async (volumePercent) => {
    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player/volume",
        {},
        {
          params: {
            volume_percent: volumePercent,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(`Volume set to ${volumePercent}%`);
    } catch (error) {
      console.error("Error setting volume:", error);
      if (error.response) {
        console.error("Spotify Error:", error.response.data.error.message);
      }
    }
  };

  const handleChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolumeState(newVolume); // Update local state for immediate UI feedback
    debouncedSetVolume(newVolume); // Call the debounced volume setter
  };

  // Debounced version of the setVolume function
  const debouncedSetVolume = debounce(setVolume, 300); // Wait 300ms after the last input to make the API call

  return (
    <Container>
      <input
        type="range"
        value={volume}
        onChange={handleChange}
        min={0}
        max={100}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
