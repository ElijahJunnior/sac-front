import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Login() { 
  return ( 
    <Flex w="100%" h="100vh" align="center" justify="center">
      <Flex as="form" flexDir="column"
        w="100%" maxW="320px" px="16px" py="24px"
        borderRadius="16px" bg="gray.100"
      >
        <FormControl>
          <FormLabel htmlFor="username">Usuário</FormLabel>
          <Input 
            type="text" id="username" 
          /> 
        </FormControl>
        <FormControl mt="16px">          
          <FormLabel htmlFor="password">
            Senha
          </FormLabel>
          <Input 
            type="password" id="password"
          /> 
        </FormControl>          
        <Input type="submit" mt="16px" /> 
      </Flex>
    </Flex>
  )
}