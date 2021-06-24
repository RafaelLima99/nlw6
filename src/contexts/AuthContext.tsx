
//com o context conseguimos com que tudo que esta dentro do contexto
//fica vizivel para os componentes filhos do contexto
// ex: <contexto>
//       </filhoa>
//       </filhob>
//     </contexto>

//nesse exemplo filhoa a e filho b tem acesso ao que tem no contexto
//o contexto é usado para compartinhar um mesmo dado para varios componentes

import { useState, useEffect, ReactNode, createContext, } from "react";
import { firebase, auth } from "../services/firebase";


type User = {
    id: string,
    name: string,
    avatar: string
  }
  
  
  type AuthContextType = {
    // o 'User' vem do type User criado a cima desse código
    //user pode ser do tipo User ou undefined
    user: User | undefined
    // indica que signInWithGoogle é uma função void
    signInWithGoogle: () => Promise<void>
  }

  type AuthContextProviderProps = {
    //   o tipo reactnode é usado quando a propriedade que vai ser recebida é children
    //   ou seja componetes que são filhos do Component pai
      children: ReactNode
  }
  




// "{} as AuthContextType" seguinifica que o createContex vai receber um objeto do tipo AuthContextType
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    // <User> siguinifica que é do tipo User
  const [user, setUser] = useState<User>();

  //essa função é executada quando esse component é mostrado em tela
  //se retirar essa função useEffect quando estiver logado e apertar F5, os dados que estão no estado são 
  //perdidos, mas usando o useEffect, toda vez que a pagina é recarregada, a função useEffect é executada
  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
      //se o usuário já estiver logado
      if(user){
        //pega os dados do usuario usando Destructuring (nativo java script)
        const {displayName, photoURL, uid} = user

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.');
        }

        //insere no estado os dados do usuário
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe();
    }
  })


  //faz login via conta googel com firebase
  async function signInWithGoogle() {
    //para autenticar com conta do google
    const provider = new firebase.auth.GoogleAuthProvider();

    //para abrir o login do google como popup
    const result = await auth.signInWithPopup(provider);
  
    //se o login foi realizado com sucesso
    if(result.user){

      //pega os dados do usuario usando Destructuring (nativo java script)
      const {displayName, photoURL, uid} = result.user

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.');
      }

      //insere no estado os dados do usuário
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }



    return(
            /* value{{}} está entre 2 {{}} pq estamos enviando um objeto se fosse uma variavel ou um numero seria {} */
            <AuthContext.Provider value={{user, signInWithGoogle}}>
                {props.children}
            </AuthContext.Provider> 
    );
}