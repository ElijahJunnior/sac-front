import { createContext, ReactNode, useContext, useState } from 'react';
import Router from 'next/router';
import { setCookie } from 'nookies';
import { api } from '../services/api';

// Criando o contexto
export const AuthContext = createContext({} as AuthContextData);

// Criando o provide para usar no inicio da aplicação
export function AuthProvider({ children } : AuthContextProps) { 
 
  // cria um estado para o usuario logado 
  const [user, setUser] = useState<User>(undefined);

  // cria a função de login
  async function signIn({ username, password }: SignInCredentials) { 
    
    // executa consumo de login
    const data = await api.post('sesseions', { 
      username, 
      password
    }).then(res => res.data); 

    // extrai o token e o refresh token
    const { token, refreshToken, userId } = data;

    setCookie(undefined, 'go2_sac.token', token, { 
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/'
    });

    setCookie(undefined, 'go2_sac.refreshToken', refreshToken, { 
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/'
    });

    setUser({
      userId, 
      username
    });

    Router.push('/');

  }

  function signOut() { 

  }

  // cria o objeto que será compartilhado pelo contexto
  const contextData : AuthContextData = { 
    user,
    signIn, 
    signOut
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

// dados compartilhado pelo contexto
type AuthContextData = {
  user: User, 
  signIn: (credentials: SignInCredentials) => Promise<void>, 
  signOut: () => void, 
}

// propriedades recebidas pelo provider do contexto
type AuthContextProps = { 
  children: ReactNode
}

// propriedades recebidas pela função SignIn
type SignInCredentials = { 
  username: string, 
  password: string
}

type User = { 
  userId: string, 
  username: string 
}