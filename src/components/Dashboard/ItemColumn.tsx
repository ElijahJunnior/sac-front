import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

type ItemColumnProps = {
  children: ReactNode
}

export function ItemColumn({ children }: ItemColumnProps) {

  return ( 

    <Flex
      flexDir={"column"} w="120px"
    //   bg="purple.100" 
    >
      {children}
    </Flex>

  )
}