import { Flex, FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"

type ItemColumnProps = Pick<FlexProps, "w" | "width" | "ml" | "marginLeft"> & {
  children: ReactNode
}

export function ItemColumn({ children, ...rest }: ItemColumnProps) {

  return ( 

    <Flex
      flexDir={"column"} { ...rest }
    //   bg="purple.100" 
    >
      {children}
    </Flex>

  )
}