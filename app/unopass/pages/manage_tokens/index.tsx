import ManageTokenBody from "@/components/manageTokenBody/ManageTokenBody";
import { Heading } from '@chakra-ui/react'
export interface TravelData {
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
  console.log(`Data Retrieved: ${data}`)
    return {
        props: {totalData: {data}} // props will be passed to the page
    };
}
export default function ManageTokens({ totalData }: { totalData: TravelData }) {
    return (
        <>
        <Heading ml = {130} mt = {50}>Your Tokens</Heading>
        {/* pass props below */}
            <ManageTokenBody totalData = {totalData}/>
        </>
    );
}