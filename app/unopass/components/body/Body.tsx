import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';
import {BiBarcode} from 'react-icons/bi';
import { TfiPlus,TfiSupport } from "react-icons/tfi";

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
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

export default function Body() {
    return (
        <Box p={14}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} padding={20}>
                <Feature
                    icon={<Icon as={TfiSupport} w={10} h={10} />}
                    title={'Managing Tokens'}
                    text={
                        'You have the capability of being able to view your tokens and unlock them accordingly'
                    }
                />
                <Feature
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
                />
            </SimpleGrid>
        </Box>
    );
}