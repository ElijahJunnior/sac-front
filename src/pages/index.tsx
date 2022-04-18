import { Box, Button, Flex, Heading, HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { BiDotsHorizontalRounded } from 'react-icons/bi';

// COMPONENTS
import { ItemColumn } from "../components/Dashboard/ItemColumn";
import { ItemLine } from "../components/Dashboard/ItemLine";
import { Ocorrencia, GetOcorrencias } from "../services/Ocorrencias";

type PageProps = {
  ocorrencias: Partial<Ocorrencia>[]
}

export default function Home( { ocorrencias } : PageProps) {

  if (!ocorrencias) {
    return (
      <Heading> Error on data loading </Heading>
    )
  }

  return (
    <>
      <Heading>
          Hello World
      </Heading>
      <VStack spacing="32px">
        {
          ocorrencias.map(ocorrencia => (
            <Flex 
              key={ocorrencia.id} 
              w="100%" maxW="1000px" px="30px" py="24px" position="relative" 
              bg="gray.100" borderRadius="16px"
              boxShadow="0px 0px 15px 5px rgba(0, 0, 0, 0.1), 5px 5px 10px 1px rgba(0, 0, 0, 0.15);"
            >
              <ItemColumn w="120px" >
                <ItemLine title="Data" value={ocorrencia.data_formatada} />
                <ItemLine title="Espera" value={ocorrencia.espera} mt="10px" />
              </ItemColumn>
              <ItemColumn w="90px" ml="20px">
                <ItemLine title="Prioridade" value={ocorrencia.descricao_prioridade} />
                <ItemLine title="Providencias" value={(2).toString()} mt="10px" />
              </ItemColumn>
              <ItemColumn w="135px" ml="20px">
                <ItemLine title="Status" value={ocorrencia.descricao_status} />
                <ItemLine title="Técnico" value={ocorrencia.usuario_atendendo?.nome || ""} mt="10px" />
              </ItemColumn>
              <ItemColumn w="275px" ml="20px">
                <ItemLine title="Cliente" value={ocorrencia.cliente?.razao_social || "Não Encontrado"} />
                <Flex mt="10px"> 
                  <Flex flexDir="column" w="105px">
                    <ItemLine title="Contato" value={ocorrencia.nome_contato} />
                  </Flex>
                  <Flex flexDir="column" w="150px">
                    <ItemLine title="Telefone" value={ocorrencia.telefone_contato} />
                  </Flex>
                </Flex>
              </ItemColumn>
              <ItemColumn w="230px" ml="20px">
                <ItemLine title="Categoria" value={ocorrencia.descricao_categoria} />
                <ItemLine title="Sub-Categoria" value={ocorrencia.descricao_sub_categoria} mt="10px" />
              </ItemColumn>
              <Menu>
                <MenuButton
                  position="absolute" bottom="15px" right="15px"
                  bg="orange.500" color='gray.300'
                  outline="none"
                  fontSize="22px" borderRadius='8px' border="none"
                  boxShadow=" 0px 0px 2px 1px rgba(0, 0, 0, 0.20), 2px 3px 5px rgba(0, 0, 0, 0.25);"                  
                  _hover={{ transform: 'scale(1.08)' }}
                  _active={{ transform: 'scale(1.08)' }}
                  // _focus={{ color: "orange.400" }}
                  // _expanded={{ bg: 'blue.400' }}
                  // transition='all 0.2s'
                  transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                >
                  <Flex h='30px' w='30px' align="center" justify="center" >
                    <BiDotsHorizontalRounded />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem>Iniciar atendimento</MenuItem>
                  <MenuItem>Consultar ocorrencia</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ))
        }
      </VStack>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {

  const ocorrencias = await GetOcorrencias();

  return {
    props: {
      ocorrencias
    }, 
  }

}

{/*
  <Menu>
  <MenuButton
    px={4}
    py={2}
    transition='all 0.2s'
    borderRadius='md'
    borderWidth='1px'
    _hover={{ bg: 'gray.400' }}
    _expanded={{ bg: 'blue.400' }}
    _focus={{ boxShadow: 'outline' }}
  >
    File 
  </MenuButton> 
  <MenuButton
    position="absolute" bottom="15px" right="15px"
    bg="orange.500" color='gray.300'
    outline="none"
    fontSize="22px" borderRadius='8px' border="none"
    boxShadow=" 0px 0px 2px 1px rgba(0, 0, 0, 0.20), 2px 3px 5px rgba(0, 0, 0, 0.25);"                  
    _hover={{ transform: 'scale(1.1)' }}
    // _active={{ bg: "orange.500", color: "gray.300" }}
    // _focus={{ color: "orange.400" }}
    // _expanded={{ bg: 'blue.400' }}
    // transition='all 0.2s'
    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
  >
    <Flex h='30px' w='30px' align="center" justify="center" >
      <BiDotsHorizontalRounded />
    </Flex>
  </MenuButton>
  <MenuList>
    <MenuItem>Iniciar atendimento</MenuItem>
    <MenuItem>Consultar ocorrencia</MenuItem>
  </MenuList>
  </Menu>
*/}

{/* <Flex
h='30px' w='30px' align="center" justify="center"
position="absolute" bottom="15px" right="15px"
as='button' outline="none"
bg="orange.500" color='gray.300'
fontSize="22px" borderRadius='8px' border="none"
boxShadow=" 0px 0px 2px 1px rgba(0, 0, 0, 0.20), 2px 3px 5px rgba(0, 0, 0, 0.25);"
transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
// _focus={{ color: "orange.400" }}
_hover={{ transform: 'scale(1.2)' }}
_active={{ bg: "orange.600", color: "gray.300" }}
>
<BiDotsHorizontalRounded />
</Flex> */}