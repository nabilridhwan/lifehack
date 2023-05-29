

import { Heading } from '@chakra-ui/react'
import { Container, HStack, VStack } from '@chakra-ui/react'

export default function TokenCreatedPage() {
    return (
        <>
            <Heading ml={130} mt={50} mb={50}>Token Has Been Generated!!!!</Heading>
            <Container maxW='2x1' bg='grey' color='black'>
                QR CODE HERE
            </Container>

        </>
    );

}
