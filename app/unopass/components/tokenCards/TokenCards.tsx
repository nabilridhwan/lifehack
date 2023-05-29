import {
    Box,
    Button,
    Center,
    Heading,
    Stack,
    Text,
    chakra,
    useColorModeValue,
} from "@chakra-ui/react";
import {TravelData} from "../../pages/manage_tokens/index"

const IMAGE =
    "https://plus.unsplash.com/premium_photo-1676618539987-12b7c8a8ae61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80";

interface TokenCardsProps {
    // flight_number: string;
    // seat_number: string;
    // gate_number: string;
    // terminal: string;
    // airline: string;
    // row_number: string
    myPropObject: TravelData;

}
const TokenCards: React.FC<TokenCardsProps> = ({myPropObject}) => {
    console.log(myPropObject);
    return (
        <Center py={12}>
            <Box
                role={"group"}
                p={6}
                maxW={"330px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"lg"}
                pos={"relative"}
                zIndex={1}
            >
                {/* <Box
					rounded={"lg"}
					mt={-12}
					pos={"relative"}
					height={"230px"}
					// _after={{
					//     transition: 'all .3s ease',
					//     content: '""',
					//     w: 'full',
					//     h: 'full',
					//     pos: 'absolute',
					//     top: 5,
					//     left: 0,
					//     backgroundImage: `url(${IMAGE})`,
					//     filter: 'blur(15px)',
					//     zIndex: -1,
					// }}
					// _groupHover={{
					//     _after: {
					//         filter: 'blur(20px)',
					//     },
					// }}
				>
					<Image
						rounded={"lg"}
						height={230}
						width={282}
						objectFit={"cover"}
						marginTop={10}
						src={IMAGE}
					/>
				</Box> */}
                <Stack pt={10} align={"center"}>
                    <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        textTransform={"uppercase"}
                    >
                        {/* {myPropObject.airline} */}
                        Singapore Airlines
                    </Text>
                    <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                    >
                        SQ2490 
                    </Heading>
                    <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                    >
                        {/* {myPropObject.airline} */}
                        Departure: 20/05/22 11pm SGT
                    </Text>
                    <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                    >
                        {/* {myPropObject.airline} */}
                        Arrival: 21/05/22 2pm SGT
                    </Text>
                    <Stack direction={"row"} align={"center"}>

                        <Button>Generate QR Code</Button>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
};

export default TokenCards;
//   export default function TokenCards() {
//     return (
//       <Center py={12}>
//         <Box
//           role={'group'}
//           p={6}
//           maxW={'330px'}
//           w={'full'}
//           bg={useColorModeValue('white', 'gray.800')}
//           boxShadow={'2xl'}
//           rounded={'lg'}
//           pos={'relative'}
//           zIndex={1}>
//           <Box
//             rounded={'lg'}
//             mt={-12}
//             pos={'relative'}
//             height={'230px'}
//             _after={{
//               transition: 'all .3s ease',
//               content: '""',
//               w: 'full',
//               h: 'full',
//               pos: 'absolute',
//               top: 5,
//               left: 0,
//               backgroundImage: `url(${IMAGE})`,
//               filter: 'blur(15px)',
//               zIndex: -1,
//             }}
//             _groupHover={{
//               _after: {
//                 filter: 'blur(20px)',
//               },
//             }}>
//             <Image
//               rounded={'lg'}
//               height={230}
//               width={282}
//               objectFit={'cover'}
//               src={IMAGE}
//             />
//           </Box>
//           <Stack pt={10} align={'center'}>
//             <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
//               Brand
//             </Text>
//             <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
//               Nice Chair, pink
//             </Heading>
//             <Stack direction={'row'} align={'center'}>
//               <Text fontWeight={800} fontSize={'xl'}>
//                 $57
//               </Text>
//               <Text textDecoration={'line-through'} color={'gray.600'}>
//                 $199
//               </Text>
//             </Stack>
//           </Stack>
//         </Box>
//       </Center>
//     );
//   }
