import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { CapitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";

// DATE FNS
import { format, Duration, differenceInMinutes, formatDuration } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export type Ocorrencia =   {
    id: string, 
    data: string, 
    data_formatada: string, 
    hora: string,
    espera: string,  
    descricao: string, 
    codigo_prioridade: string,
    descricao_prioridade: string, 
    status: string, 
    descricao_status: string, 
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

export default function Home( { ocorrencias } : PageProps) {
    
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
                <Flex 
                  flexDir={"column"} w="108px"
                //   bg="purple.100" 
                >
                  <Heading sx={headingStyles}>
                    Data
                  </Heading>
                  <Text sx={textStyles} mt="5px" ml="5px" >
                    {ocorrencia.data_formatada}
                  </Text>
                  <Heading sx={headingStyles} mt="10px">
                    Espera
                  </Heading>
                  <Text sx={textStyles} mt="5px" ml="5px" >
                    {ocorrencia.espera}
                  </Text>
                </Flex>
                <Flex 
                  flexDir={"column"} w="90" ml="20px"
                //   bg="orange.100" 
                >
                  <Heading sx={headingStyles}>
                    Prioridade
                  </Heading>
                  <Text sx={textStyles} mt="5px" ml="5px">
                    {ocorrencia.descricao_prioridade}
                  </Text>
                  <Heading sx={headingStyles} mt="10px">
                    Providencias
                  </Heading>
                  <Text sx={textStyles} mt="5px" ml="5px">
                    {2}
                  </Text>
                </Flex>
                <Flex 
                  flexDir={"column"} w="135px" ml="20px" 
                //   bg="blue.100" 
                >
                  <Heading sx={headingStyles}>
                      Status
                  </Heading>
                  <Text sx={textStyles} mt="5px" ml="5px">
                      {ocorrencia.descricao_status}
                  </Text>
                  <Heading sx={headingStyles} mt="10px">
                      Técnico
                  </Heading>
                  <Text sx={textStyles} mt="5px" ml="5px" noOfLines={1}>
                      {ocorrencia.usuario_atendendo?.nome || ""}
                  </Text>
                </Flex>
                <Flex 
                    flexDir="column" w="280px" ml="20px"
                    // bg="yellow.100"
                >
                    <Heading sx={headingStyles}>
                        Cliente
                    </Heading>
                    <Text sx={textStyles} mt="5px" ml="5px" noOfLines={1}>
                        {ocorrencia.cliente?.razao_social || "Não Encontrado"}
                    </Text>
                    <Flex mt="10px"
                        // bg="red.100"
                    > 
                        <Flex flexDir="column" w="105px">
                            <Heading sx={headingStyles}>
                                Contato
                            </Heading>
                            <Text sx={textStyles} mt="5px" ml="5px" noOfLines={1}>
                                {ocorrencia.nome_contato}
                            </Text>
                        </Flex>
                        <Flex flexDir="column" w="155px">
                            <Heading sx={headingStyles}>
                                Telefone
                            </Heading>
                            <Text sx={textStyles} mt="5px" ml="5px" noOfLines={1}>
                                {ocorrencia.telefone_contato}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex 
                    flexDir="column" w="240px" ml="20px"
                    // bg="green.100"
                >
                        <Heading sx={headingStyles}>
                            Categoria
                        </Heading>
                        <Text sx={textStyles} mt="5px" ml="5px" noOfLines={1}>
                            {ocorrencia.descricao_categoria}
                        </Text>
                        <Heading sx={headingStyles} mt="10px">
                            Sub-Categoria
                        </Heading>
                        <Text sx={textStyles} mt="5px" ml="5px" noOfLines={1}>
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

  function handleOccurrenceStatus(ocorrence: Ocorrencia) {

      if (ocorrence.em_atendimento === "A") {
          return "Em Atendimento"
      } else if (ocorrence.em_atendimento === "E") {
          return "Em Espera"
      } else if (ocorrence.ultimo_tipo_ocorrencia === "E") { 
          return "Encaminhada"
      } else if (ocorrence.status === "A" ){
          return "Aberta"
      } else if (ocorrence.status === "F" ) { 
          return "Fechada"
      } else {
          return ""
      }

  }

  function handlePriority(ocorrence: Ocorrencia) {

      switch (ocorrence.codigo_prioridade) {
          case "B":
              return "Baixa"
          case "N":
              return "Normal"
          case "A":
              return "Alta"
          case "C":
              return "Crítica"
          default:
              return ""
      }

    }

    if (!data) {
      return {
        props: {
          ocorrencias: []
        }
      }
    }
 
    const result = data?.reduce((acc, cur) => {

        cur.descricao = CapitalizeFirstLetter(cur.descricao)
        cur.descricao_categoria = CapitalizeFirstLetter(cur.descricao_categoria)
        cur.descricao_sub_categoria = CapitalizeFirstLetter(cur.descricao_sub_categoria)
        cur.descricao_tipo_atendimento = CapitalizeFirstLetter(cur.descricao_tipo_atendimento)
        cur.nome_contato = CapitalizeFirstLetter(cur.nome_contato)
        cur.nome_sistema = CapitalizeFirstLetter(cur.nome_sistema)
        cur.descricao_status = handleOccurrenceStatus(cur)
        cur.descricao_prioridade = handlePriority(cur)
        
        if (!!cur.data && cur.hora) {            
            
            const hora = Number(cur.hora.substring(0, Math.min(cur.hora.length, 2)));
            const minutos = Number(cur.hora.substring(3, Math.min(cur.hora.length, 5)));
            const data = new Date(cur.data);           
            const intervalo = differenceInMinutes(new Date(), data)
            
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

            cur.espera = 
                Math.floor(intervalo / 60).toString() + 
                ":" + (intervalo% 60).toString().padStart(2, "0")

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