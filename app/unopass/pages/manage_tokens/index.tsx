import ManageTokenBody from "@/components/manageTokenBody/ManageTokenBody";
import { Heading } from '@chakra-ui/react'

export default function ManageTokens() {
    return (
        <>
        <Heading ml = {130} mt = {50}>Your Tokens</Heading>
            <ManageTokenBody />
        </>
    );
}