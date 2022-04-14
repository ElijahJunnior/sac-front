import { createContext, ReactNode, useContext, useState } from 'react';

// Criando o contexto
export const AuthContext = createContext({} as AuthContextData);

// Criando o provide para usar no inicio da aplicação
export function AuthProvider({ children } : AuthContextProps) { 
 
  // cria um estado para o usuario logado 
  const [userId, setUserId] = useState('');

  // cria a função de login
  function signIn() { 
    // fazer login e setar o usuario logado no estado user
    setUserId('000001');
  }

  // cria o objeto que será compartilhado pelo contexto
  const contextData : AuthContextData = { 
    userId,
    signIn
  };

  // Retorna a provider com o conteudo do contexto
  return (
    <AuthContext.Provider value={contextData}> 
      {children}
    </AuthContext.Provider>
  )

}

// Criando hook para usar em todas as paginas que precisarem do contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Tipo dos dados compartilhado pelo contexto
type AuthContextData = {
  userId: string
  signIn(): void
}

// tipo das propriedades recebidas pelo provider do contexto
type AuthContextProps = { 
  children: ReactNode
}