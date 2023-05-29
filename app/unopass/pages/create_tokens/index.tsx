import { Button, Heading } from '@chakra-ui/react';
import { Container, HStack, VStack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { format } from 'date-fns';

import TokenCreatedPage from '../token_created_page';

interface TravelData {
    id: number,
    user_id: string,
    departure_time: Date,
    arrival_time: Date,
    flight_number: string,
    seat_number: string,
    gate_number: string,
    terminal: string,
    airline: string,
    row_number: string,
    created_at: Date,
    updated_at: Date,
    departure_time_formatted: string,
    arrival_time_formatted: string,
}




export async function getStaticProps() {
    // fetch the blog posts from the mock API
    const res = await fetch('http://localhost:3000/api/getIndivTravelData');
    const travelDataResponse = await res.json();
    const data: TravelData = travelDataResponse.data;
  
    return {
        props: {totalData: {data}} // props will be passed to the page
    };
}



export default function CreateTokens({ totalData }: { totalData: TravelData }) {
    return <>
        <Heading ml={130} mt={50} mb={50}>Information</Heading>
        <VStack>
            <Container maxW='md' bg='grey' color='black' alignItems={'center'} alignContent={'center'} pl={50} pr={50}>

                <HStack>
                    <Container maxW='2x1' bg='grey' color='black'>
                        Departure Time:
                    </Container>
                    <Container maxW='2550px' bg='grey' color='black'>
                        {/* console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' }).format(date2)); */}
                        Departure: 20/05/22 11pm SGT


                        {/* {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' }).format(data.departure_time)} */}
                    </Container>
                </HStack>
                <HStack>
                    <Container maxW='2x1' bg='grey' color='black'>
                        Arrival Time:
                    </Container>
                    <Container maxW='2550px' bg='grey' color='black'>
                        {/* {totalData.arrival_time} */}
                        Arrival: 21/05/22 2pm SGT


                    </Container>
                </HStack>
              
                <HStack>
                    <Container maxW='2x1' bg='grey' color='black'>
                        Flight Number:
                    </Container>
                    <Container maxW='2550px' bg='grey' color='black'>
                    SQ2490
                    </Container>
                </HStack>
              
            </Container>
            <Button bg='teal' variant='solid'>
                <Link href="/token_created_page">
                    Export to token

                </Link>
            </Button>
        </VStack>
    </>
}