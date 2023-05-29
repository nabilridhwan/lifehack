import { Button, Heading } from '@chakra-ui/react';
import { Container, HStack, VStack } from '@chakra-ui/react'
import Buttons from "../"
export default function ScanningPage() {
    return (
        <>
            <Heading ml={130} mt={50} mb={50}>Information</Heading>
            <VStack>
                <Container maxW='md' bg='grey' color='black' alignItems={'center'} alignContent={'center'} pl={50} pr={50}>
                    <HStack>
                        <Container maxW='2x1' bg='grey' color='black'>
                            Name:
                        </Container>
                        <Container maxW='2550px' bg='grey' color='black'>
                            "550px" Container
                        </Container>

                    </HStack>
                    <HStack>
                        <Container maxW='2x1' bg='grey' color='black'>
                            FLight Time:
                        </Container>
                        <Container maxW='2550px' bg='grey' color='black'>
                            "550px" Container
                        </Container>
                    </HStack>
                    <HStack>
                        <Container maxW='2x1' bg='grey' color='black'>
                            Hotel Name:
                        </Container>
                        <Container maxW='2550px' bg='grey' color='black'>
                            "550px" Container
                        </Container>
                    </HStack>
                    <HStack>
                        <Container maxW='2x1' bg='grey' color='black'>
                            Flight Number:
                        </Container>
                        <Container maxW='2550px' bg='grey' color='black'>
                            "550px" Container
                        </Container>
                    </HStack>
                    <HStack>
                        <Container maxW='2x1' bg='grey' color='black'>
                            Passport Number:
                        </Container>
                        <Container maxW='2550px' bg='grey' color='black'>
                            "550px" Container
                        </Container>
                    </HStack>
                </Container>
                <Button bg='teal' variant='solid'>
                    Board
                </Button>
            </VStack>
        </>
    );

}