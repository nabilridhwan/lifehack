import React from "react";
import Nav from "../nav/Nav";
import Hero from "../hero/Hero";
import { Box } from "@chakra-ui/react";

export default function Header ()  {
   return (
       <Box className='header'>
           <Box className='header__content'>
               <Nav />
               <Hero />
           </Box>
       </Box>
   );
};