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
    return (
        <>
            <Heading> 
                Hello World
            </Heading> 
            <VStack spacing="16px">
                {
                    ocorrencias.map(ocorrencia => (
                        <Box 
                            key={ocorrencia.id} 
                            p="16px"
                            bg="gray.200" borderRadius="16px"
                        >
                            <Text>Cliente</Text>
                            <Heading>{ocorrencia.cliente?.razao_social || "N/A"}</Heading>
                        </Box>
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