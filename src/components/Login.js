import React from 'react';
import styled from 'styled-components';

export default function Login() {
    const handleClick = () => {
      const clientId ="a3720ca3ce55446a9457cd7169c48190";
        const redirectUrl = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";

        const scopes = ["user-read-private",
            " user-read-email",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played",
            "user-library-read",
    ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join
        ( " "
           )}&response_type=token&show_dialog=true`;
    }
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        alt="Spotify Logo"
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #1db954; /* Spotify Green */

  img {
    width: 200px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    background-color: white;
    color: #1db954;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    
    &:hover {
      background-color: #17a44a;
      color: white;
    }
  }
`;

