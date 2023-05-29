import Buttons from "../../components/button/Button"
import { Button, ButtonProps, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function ScanTokens() {
    const router = useRouter();
    const handleButtonClick = () => {
        // Perform any necessary actions before redirecting
        // ...
    
        // Redirect to the desired page
        router.push('/scanning_page');

    // const buttonProps: ButtonProps = {
    //     // Specify the desired props for the Button component
    //     // Example: size="sm", variant="outline", etc.
    //     // You can add any ButtonProps attribute based on your requirements
    //     size: "sm",
    //     variant: "outline",
    //     onClick: handleButtonClick
    //     // ... other props
    //   };
      
      };
    return <Buttons onClick = {handleButtonClick} />
}