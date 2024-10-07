import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Login from "./Login";
import useResponsive from "../../hooks/UseResponsive";

import LogoBg from '../../../img/LogoBg.jpg'
import LOGOBG1 from '../../../img/LOGOBG1.jpg'
import LOGO1 from '../../../img/logo1.jpg'

import moment from 'moment'

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow:
    " rgba(17, 17, 26, 0.1) 1px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const LoginForm = () => {

  //rendom LOGO ตามวันที่
  const [imageSource, setImageSource] = useState('');

  let today = moment().format('DD MM YYYY');

  const imageUrls = [
    LOGOBG1,
    LogoBg,
    LOGO1
  ];

  const generateRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setImageSource(imageUrls[randomIndex]);

    localStorage.setItem('randomImage', imageUrls[randomIndex])
    localStorage.setItem('randomImageDate', today)
  };




  useEffect(() => {


    const saveDate = localStorage.getItem('randomImageDate');
    const saveImage = localStorage.getItem('randomImage');

    if (saveDate === today && saveImage) {
      setImageSource(saveImage);
    } else {
      generateRandomImage();
    }

  }, [])
  // const AnimatedText = ({ text }) => {
  //   return (
  //     <h4 className="animated-text">
  //       {text.split("").map((char, index) => (
  //         <span key={index}>{char === " " ? "\u00A0" : char}</span>
  //       ))}
  //     </h4>
  //   );
  // };

  const AnimatedText = ({ text }) => {
    return (
      <h4 className="animated-text" style={{ fontSize: '40px' }}>
        {text.split("").map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h4>
    );
  };

  const mdUp = useResponsive("up", "md");



  return (
    <>
      <Helmet>
        <title> Login | Form </title>
      </Helmet>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img src={imageSource} alt="login" style={{ width: "100%" }} />

              <div style={{ position: "absolute", top: "20%", left: "40%", transform: "translate(-50%, -50%)" }}>
                <AnimatedText text="Hi Bro, Welcome Back" />
              </div>
            </div>
          </StyledSection>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            {/* <Typography variant="h3" gutterBottom className='logoFont' >
              LOGIN
            </Typography> */}
            <h1 className='logoFont' style={{ textAlign: 'center' }}>LOGIN</h1>
            <Divider sx={{ my: 3 }} />
            <Login />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default LoginForm;
