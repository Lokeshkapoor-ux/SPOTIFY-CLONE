import React, { useEffect,useRef,useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground , setNavBackground] = useState(false);
  const [headerBackground , setHeaderBackground] = useState(false);
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
    bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false);
  };
  
  useEffect(() => {
    const getUserInfo = async () => {
      if (!token) return; // Prevent API call if token is undefined

      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("User Info:", data);

        // Store user info in state
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });

      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo();
  }, [token, dispatch]);

  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref = {bodyRef} onScroll={bodyScrolled}>

          <Navbar navBackground = {navBackground}/>
          <div className="body__contents">
            <Body headerBackground = {headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(32, 87, 100, 1));
  }

  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar{
   width:0.7rem;
   &-thumb {
   background-color:rgba(255,255,255,0.6);
   }
  }

  .body__contents {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
`;
