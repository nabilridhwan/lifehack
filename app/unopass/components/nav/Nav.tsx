import React from "react";
import {
    Box,
    Flex,
    HStack,
    Heading,
    Icon,
    Link,
    Spacer,
} from "@chakra-ui/react";

export const links = [
    {
        id: 1,
        link: "/",
        name: "Home",
    },
    { id: 2, link: "/manage_tokens", name: "Manage Tokens" },
    {
        id: 3,
        link: "/create_tokens",
        name: "Create Tokens",
    },
    {
        id: 4,
        link: "/scan_tokens",
        name: "Scan Tokens",
    },
 ];
 
 const Nav = () => {
    return (
        <Flex
            w='full'
            alignItems='center'
            minHeight={"10vh"}
            padding={{ base: "30px", md: "30px 70px" }}
            justifyContent='space-between'
        >
            <Box>
                <Heading as='h2' size='md' color='#808080'>
                    UNOPASS
                </Heading>
            </Box>

            <Spacer />

            <HStack spacing='30px' display={{ base: "none", lg: "inline-block" }}>
                {links.map((li) => (
                    <Link
                        href={li.link}
                        color='#000000'
                        opacity={0.7}
                        fontWeight='semibold'
                        key={li.id}
                    >
                        {li.name}
                    </Link>
                ))}
            </HStack>

            <Spacer />

            
        </Flex>
    );
};

export default Nav;