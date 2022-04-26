// REACT / NEXT 
import { GetServerSideProps } from "next";

// CHAKRA
import { Flex, Heading, useDisclosure, VStack } from "@chakra-ui/react";

// OTHERS LIBS
import { FaHeadset, FaPaperPlane, FaBinoculars } from 'react-icons/fa';

// COMPONENTS
import { ItemLine } from "../components/Dashboard/ItemLine";
import { ItemColumn } from "../components/Dashboard/ItemColumn";
import { ItemButton } from "../components/Dashboard/ItemButton";

// API CONSUMS
import { Ocorrencia, GetOcorrencias } from "../services/Ocorrencias";
import { CommonButton } from "../components/CommonButton";
import { CommonModal } from "../components/CommonModal";

type PageProps = {
  ocorrencias: Partial<Ocorrencia>[]
}

export default function Home( { ocorrencias } : PageProps) {

  const { isOpen, onClose, onOpen } = useDisclosure(); 
  
  if (!ocorrencias) {
    return (
      <Heading> Error on data loading </Heading>
    )
  }

  return (
    <>
      <Flex 
        as={'header'} justify="space-between"
        w="100%" maxW="1000px"
        marginX="auto" my="24px"
      >
        <Heading>
            Hello World
        </Heading>
        <CommonButton py="8px" px="12px" onClick={onOpen}>
          Adicionar
        </CommonButton>        
      </Flex> 
      <VStack spacing="32px">
        {
          ocorrencias.map(ocorrencia => (
            <Flex 
              key={ocorrencia.id} 
              w="100%" maxW="1000px" px="24px" py="20px" position="relative" 
              bg="gray.100" borderRadius="16px"
              boxShadow="0px 0px 15px 5px rgba(0, 0, 0, 0.1), 5px 5px 10px 1px rgba(0, 0, 0, 0.15);"
            >
              <ItemColumn w="120px" >
                <ItemLine title="Data" value={ocorrencia.data_formatada} />
                <ItemLine title="Espera" value={ocorrencia.espera} mt="10px" />
              </ItemColumn>
              <ItemColumn w="90px" ml="20px">
                <ItemLine title="Prioridade" value={ocorrencia.descricao_prioridade} />
                <ItemLine title="Providencias" value={ocorrencia.providencias.length.toString()} mt="10px" />
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
              <Flex w="26px" ml="20px" flexDir="column" justify="space-between">
                <ItemButton> 
                  <FaHeadset />
                </ItemButton>
                <ItemButton> 
                  <FaPaperPlane />
                </ItemButton>
                <ItemButton> 
                  <FaBinoculars />
                </ItemButton>
              </Flex>
            </Flex>
          ))
        }
      </VStack>
      <CommonModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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