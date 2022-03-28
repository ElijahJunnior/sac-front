import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { execOnce } from "next/dist/shared/lib/utils";
import { resourceUsage } from "process";

export type Ocorrencia =   {
    id: string, 
    data: string, 
    hora: string, 
    descricao: string, 
    codigo_prioridade: string, 
    status: string, 
    nome_contato: string, 
    telefone_contato: string, 
    em_atendimento: string, 
    nome_sistema: string, 
    descricao_tipo_atendimento: string, 
    descricao_categoria: string, 
    descricao_sub_categoria: string, 
    ultimo_tipo_ocorrencia: string, 
    ultima_data: string, 
    ultima_hora: string, 
    cliente?: {
      id: string
      razao_social: string
      nome_fantasia: string
      cpf_cnpj: string
      perfil: string
    },
    usuario?: {
      id: string,
      nome: string
    },
    ultimo_usuario?: {
        id: string,
        nome: string
    },
    usuario_atendendo?: {
        id: string,
        nome: string
    }
}

type PageProps = {
    ocorrencias: Ocorrencia[]
}

export default function ChakraDeshboard( { ocorrencias } : PageProps) {
    
    const headingStyles = {
        fontWeight: "700", 
        color: "gray.500", 
        fontSize:"14px",  
        lineHeight: "17px" 
    }

    return (
        <>
            <Heading>
                Hello World
            </Heading>
            <VStack spacing="16px">
                {
                    ocorrencias.map(ocorrencia => (
                        <Flex 
                            key={ocorrencia.id} 
                            // p="16px"
                            bg="gray.100" borderRadius="16px"
                            maxW="1000px"
                        >
                            <Flex>
                                <Flex flexDir="column">
                                    <Heading sx={headingStyles}>
                                        Data
                                    </Heading>
                                    <Text>{ocorrencia.data}</Text>
                                    <Heading sx={headingStyles}>
                                        Prioridade
                                    </Heading>
                                    <Text>{ocorrencia.codigo_prioridade}</Text>
                                </Flex>
                                <Flex flexDir="column">                                   
                                    <Heading sx={headingStyles}>
                                            Espera
                                    </Heading>
                                    <Text>{"2:25"}</Text>
                                    <Heading sx={headingStyles}>
                                        Providencias
                                    </Heading>
                                    <Text>{2}</Text>
                                </Flex>
                                <Flex flexDir="column">
                                    <Heading sx={headingStyles}>
                                        Status
                                    </Heading>
                                    <Text>{ocorrencia.status}</Text>
                                    <Heading sx={headingStyles}>
                                        Técnico
                                    </Heading>
                                    <Text>{ocorrencia.usuario_atendendo?.nome || ""}</Text>
                                </Flex>
                            </Flex>
                            <Flex flexDir="column">
                                <Heading sx={headingStyles}>
                                    Cliente
                                </Heading>
                                <Text>{ocorrencia.cliente?.razao_social || ""}</Text>
                                <Flex> 
                                    <Flex flexDir="column">
                                        <Heading sx={headingStyles}>
                                            Contato
                                        </Heading>
                                        <Text>{ocorrencia.nome_contato}</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Heading sx={headingStyles}>
                                            Telefone
                                        </Heading>
                                        <Text>{ocorrencia.telefone_contato}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex flexDir="column">
                                    <Heading sx={headingStyles}>
                                        Categoria
                                    </Heading>
                                    <Text>{ocorrencia.descricao_categoria}</Text>
                                    <Heading sx={headingStyles}>
                                        Sub-Categoria
                                    </Heading>
                                    <Text>{ocorrencia.descricao_sub_categoria}</Text>
                            </Flex>
                        </Flex>
                    ))
                }
            </VStack>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
 
    const data = await fetch("http://localhost:3030/ocorrencia/ListarAbertas").then(
        (res: Response) => {
            return res.json()
        }
    )
 
    return {
        props: {
            ocorrencias: data
        }, 
    }
}