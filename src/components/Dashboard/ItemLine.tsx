import { Flex, Heading, Text, FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"

type ItemLineProps = Pick<FlexProps, "mt" | "marginTop">  & {
  title: string,
  value: string
}

export function ItemLine({ title, value, ...rest }: ItemLineProps) {

  return ( 

    <Flex
      flexDir={"column"} w="120px" {...rest}
    //   bg="purple.100" 
    >
      <Heading 
        color="gray.500" fontWeight="700"
        fontSize="14px" lineHeight="17px"
      >
          {title}
      </Heading>
      <Text 
        mt="5px" ml="5px" color="gray.800" 
        fontWeight="400" fontSize="16px" lineHeight="19px" 
      >
        {value}
      </Text>
    </Flex>

  )
}