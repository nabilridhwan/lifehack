import { Button, ButtonProps, Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { MdBuild } from "react-icons/md"
import {BiScan} from "react-icons/bi";
export default function Buttons(props: ButtonProps) {
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Button
        {...props}
        leftIcon={<BiScan />}
        /* flex={1} */
        px={4}
        fontSize={'sm'}
        rounded={'full'}
        bg={'blue.400'}
        color={'blue'}
        boxShadow={
          '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
        }
        _hover={{
          bg: 'blue.500',
        }}
        _focus={{
          bg: 'blue.500',
        }}>
        Scan QR
        <Link href='/scanning_page'/>
      </Button>

     
    </Flex>
    
  );
}