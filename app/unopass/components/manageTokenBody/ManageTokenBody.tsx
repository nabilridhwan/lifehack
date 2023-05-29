import { Box, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import TokenCards from "../tokenCards/TokenCards";
import {TravelData} from "../../pages/manage_tokens/index"
interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={"center"}
                justify={"center"}
                color={"white"}
                rounded={"full"}
                bg={"gray.100"}
                mb={1}
            >
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={"gray.600"}>{text}</Text>
        </Stack>
    );
};
const myPropObject = {
    name: "Istanbul Trip Token",
    generated: new Date("2022-10-11"),
};
const myPropObject2 = {
    name: "Bali Trip Token",
    generated: new Date("2022-10-11"),
};

const myPropObject3 = {
    name: "Karachi Trip Token",
    generated: new Date("2022-10-11"),
};
interface ManageTokenBodyProps {
    totalData: TravelData; // Assuming TravelData is the correct type for the totalData prop
}

export default function ManageTokenBody({ totalData }: ManageTokenBodyProps) {
    return (
        <Box p={14}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} padding={25}>
                <TokenCards myPropObject={totalData} />
                <TokenCards myPropObject={totalData} />
                <TokenCards myPropObject={totalData} />

                {/* <TokenCards myPropObject={myPropObject2} />
                <TokenCards myPropObject={myPropObject3} /> */}
                {/* <Feature
                    icon={<Icon as={TfiPlus} w={10} h={10} />}
                    title={'Create Tokens'}
                    text={
                        'Based on your purchase data, you are bale to have tokens created'
                    }
                />
                <Feature
                    icon={<Icon as={BiBarcode} w={10} h={10} />}
                    title={'Scan Tokens'}
                    text={
                        'You are able to scan tokens, upon departure, and this way, you are able to have all your details in 1 place!'
                    }
                /> */}
            </SimpleGrid>
        </Box>
    );
}
