import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { CapitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";

// DATE FNS
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export type Ocorrencia =   {
    id: string, 
    data: string, 
    hora: string, 
    data_formatada: string, 
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

    const textStyles = {
        fontWeight: "400", 
        color: "gray.800", 
        fontSize: "16px", 
        fontHeight: "19px"
    }

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
            <VStack spacing="16px">
                {
                    ocorrencias.map(ocorrencia => (
                        <Flex 
                            key={ocorrencia.id} 
                            // p="16px"
                            w="100%" maxW="1000px" px="30px" py="24px"
                            bg="gray.100" borderRadius="16px"
                        >
                            <Flex>
                                <Flex flexDir="column">
                                    <Heading sx={headingStyles}>
                                        Data
                                    </Heading>
                                    <Text sx={textStyles}>
                                        {ocorrencia.data_formatada}
                                    </Text>
                                    <Heading sx={headingStyles}>
                                        Prioridade
                                    </Heading>
                                    <Text sx={textStyles}>
                                        {ocorrencia.codigo_prioridade}
                                    </Text>
                                </Flex>
                                <Flex flexDir="column">                                   
                                    <Heading sx={headingStyles}>
                                            Espera
                                    </Heading>
                                    <Text sx={textStyles}>
                                        {"2:25"}
                                    </Text>
                                    <Heading sx={headingStyles}>
                                        Providencias
                                    </Heading>
                                    <Text sx={textStyles}>
                                        {2}
                                    </Text>
                                </Flex>
                                <Flex flexDir="column">
                                    <Heading sx={headingStyles}>
                                        Status
                                    </Heading>
                                    <Text sx={textStyles}>
                                        {ocorrencia.status}
                                    </Text>
                                    <Heading sx={headingStyles}>
                                        Técnico
                                    </Heading>
                                    <Text sx={textStyles}>
                                        {ocorrencia.usuario_atendendo?.nome || ""}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex flexDir="column">
                                <Heading sx={headingStyles}>
                                    Cliente
                                </Heading>
                                <Text sx={textStyles}>
                                    {ocorrencia.cliente?.razao_social || ""}
                                </Text>
                                <Flex> 
                                    <Flex flexDir="column">
                                        <Heading sx={headingStyles}>
                                            Contato
                                        </Heading>
                                        <Text sx={textStyles}>
                                            {ocorrencia.nome_contato}
                                        </Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Heading sx={headingStyles}>
                                            Telefone
                                        </Heading>
                                        <Text sx={textStyles}>
                                            {ocorrencia.telefone_contato}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex flexDir="column">
                                    <Heading sx={headingStyles}>
                                        Categoria
                                    </Heading>
                                    <Text sx={textStyles}>
                                        {ocorrencia.descricao_categoria}
                                    </Text>
                                    <Heading sx={headingStyles}>
                                        Sub-Categoria
                                    </Heading>
                                    <Text sx={textStyles}>
                                        {ocorrencia.descricao_sub_categoria}
                                    </Text>
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

    const result = data.reduce((acc, cur) => {

        cur.descricao = CapitalizeFirstLetter(cur.descricao)
        cur.descricao_categoria = CapitalizeFirstLetter(cur.descricao_categoria)
        cur.descricao_sub_categoria = CapitalizeFirstLetter(cur.descricao_sub_categoria)
        cur.descricao_tipo_atendimento = CapitalizeFirstLetter(cur.descricao_tipo_atendimento)
        cur.nome_contato = CapitalizeFirstLetter(cur.nome_contato)
        cur.nome_sistema = CapitalizeFirstLetter(cur.nome_sistema)
        
        if (!!cur.data && cur.hora) {            
            
            const hora = Number(cur.hora.substring(0, Math.min(cur.hora.length, 2)));
            const minutos = Number(cur.hora.substring(3, Math.min(cur.hora.length, 5)));
            const data = new Date(cur.data);           
            
            data.setHours(hora, minutos);

            cur.data_formatada = format(
                data, 
                "dd MMM, HH:mm", {
                    locale: ptBR
                }
            )

            cur.data_formatada = CapitalizeFirstLetter(
                cur.data_formatada, "all-line"
            )

        }

        if (!!cur.cliente) { 
            cur.cliente.razao_social = CapitalizeFirstLetter(
                cur.cliente.razao_social, "all-line"
            )
            cur.cliente.nome_fantasia = CapitalizeFirstLetter(
                cur.cliente.nome_fantasia, "all-line"
            )
        }

        if (!!cur.ultimo_usuario) { 
            cur.ultimo_usuario.nome = CapitalizeFirstLetter(
                cur.ultimo_usuario.nome, "all-line"
            )
        }

        if (!!cur.usuario) { 
            cur.usuario.nome = CapitalizeFirstLetter(
                cur.usuario.nome, "all-line"
            )
        }

        if (!!cur.usuario_atendendo) { 
            cur.usuario_atendendo.nome = CapitalizeFirstLetter(
                cur.usuario_atendendo.nome, "all-line"
            )
        }

        acc.push(cur)

        return acc

    }, [] as Partial<Ocorrencia>[])
 
    return {
        props: {
            ocorrencias: result
        }, 
    }
}