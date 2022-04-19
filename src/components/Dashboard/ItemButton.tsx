import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type ItemButtonProps = { 
  children: ReactNode
}

export function ItemButton( { children }: ItemButtonProps ) {
  return (
    <Flex
      h='26px' w='26px' align="center" justify="center"
      // position="absolute" bottom="15px" right="15px"
      as='button' outline="none"
      bg="orange.500" color='gray.300'
      fontSize="14px" borderRadius='8px' border="none"
      boxShadow=" 0px 0px 2px 1px rgba(0, 0, 0, 0.20), 2px 3px 5px rgba(0, 0, 0, 0.25);"
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
      // _focus={{ color: "orange.400" }}
      _hover={{ bg: "orange.600", color: "gray.300" }}
      _active={{ transform: 'scale(1.2)' }}
    >
      {children}
    </Flex>
  )
}