import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

// <FlexProps, 
//   "w" | "width" | "h" | "height" | 
//   "padding" | "p" |  "py" | "paddingY" | "px" | "paddingX" |
//   "pt" | "paddingTop" | "pl" | "paddingLeft" | 
//   "pb" | "paddingBottom" | "pr" | "paddingRight"
// >

type ItemButtonProps = FlexProps & { 
  children: ReactNode
}

export function CommonButton( { children, ...rest }: ItemButtonProps ) {
  return (
    <Flex
      align="center" justify="center"
      // h='26px' w='26px' 
      as='button' outline="none"
      bg="orange.500" color='gray.300'
      fontSize="14px" borderRadius='8px' border="none"
      boxShadow="0px 0px 2px 1px rgba(0, 0, 0, 0.20), 2px 3px 5px rgba(0, 0, 0, 0.25);"
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
      // _focus={{ color: "orange.400" }}
      _hover={{ bg: "orange.600", color: "gray.300" }}
      _active={{ transform: 'scale(1.2)' }}
      { ...rest }
    >
      {children}
    </Flex>
  )
}