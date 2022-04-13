import { format, differenceInMinutes } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { CapitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";
import { api } from "./api";

function handlePriority(ocorrence: Ocorrencia) {

  switch (ocorrence.codigo_prioridade) {
    case "B":
      return "Baixa";
    case "N":
      return "Normal";
    case "A":
      return "Alta";
    case "C":
      return "Crítica";
    default:
      return "";
  }

}

function handleOccurrenceStatus(ocorrence: Ocorrencia) {

  if (ocorrence.em_atendimento === "A") {
    return "Em Atendimento";
  } else if (ocorrence.em_atendimento === "E") {
    return "Em Espera";
  } else if (ocorrence.ultimo_tipo_ocorrencia === "E") { 
    return "Encaminhada";
  } else if (ocorrence.status === "A" ){
    return "Aberta";
  } else if (ocorrence.status === "F" ) { 
    return "Fechada";
  } else {
    return "";
  }

}

export async function GetOcorrencias() {
  
  const response = await api.get('ocorrencia/ListarAbertas');
  
  if (!response) {
    return [] as Partial<Ocorrencia>[];
  }
    
  const result: Partial<Ocorrencia>[] = response.data.reduce((acc, cur) => {

    cur.descricao = CapitalizeFirstLetter(cur.descricao);
    cur.descricao_categoria = CapitalizeFirstLetter(cur.descricao_categoria);
    cur.descricao_sub_categoria = CapitalizeFirstLetter(cur.descricao_sub_categoria);
    cur.descricao_tipo_atendimento = CapitalizeFirstLetter(cur.descricao_tipo_atendimento);
    cur.nome_contato = CapitalizeFirstLetter(cur.nome_contato);
    cur.nome_sistema = CapitalizeFirstLetter(cur.nome_sistema);
    cur.descricao_status = handleOccurrenceStatus(cur);
    cur.descricao_prioridade = handlePriority(cur);
      
    if (!!cur.data && cur.hora) {            
        
      const hora = Number(cur.hora.substring(0, Math.min(cur.hora.length, 2)));
      const minutos = Number(cur.hora.substring(3, Math.min(cur.hora.length, 5)));
      const data = new Date(cur.data);           
      const intervalo = differenceInMinutes(new Date(), data);
      
      data.setHours(hora, minutos);
      
      cur.data_formatada = format(
        data, 
        "dd MMM, HH:mm", {
          locale: ptBR
        }
      );

      cur.data_formatada = CapitalizeFirstLetter(
        cur.data_formatada, "all-line"
      );

      cur.espera = 
        Math.floor(intervalo / 60).toString() + 
        ":" + (intervalo% 60).toString().padStart(2, "0");

    }

    if (!!cur.cliente) { 
      cur.cliente.razao_social = CapitalizeFirstLetter(
        cur.cliente.razao_social, "all-line"
      );
      cur.cliente.nome_fantasia = CapitalizeFirstLetter(
        cur.cliente.nome_fantasia, "all-line"
      );
    }

    if (!!cur.ultimo_usuario) { 
      cur.ultimo_usuario.nome = CapitalizeFirstLetter(
        cur.ultimo_usuario.nome, "all-line"
      );
    }

    if (!!cur.usuario) { 
      cur.usuario.nome = CapitalizeFirstLetter(
        cur.usuario.nome, "all-line"
      );
    }

    if (!!cur.usuario_atendendo) { 
      cur.usuario_atendendo.nome = CapitalizeFirstLetter(
        cur.usuario_atendendo.nome, "all-line"
      );
    }

    acc.push(cur);

    return acc;

  }, [])

  return result;

}

export type Ocorrencia = {
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


