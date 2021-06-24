//com o context conseguimos com que tudo que esta dentro do contexto
//fica vizivel para os componentes filhos do contexto
// ex: <contexto>
//       </filhoa>
//       </filhob>
//     </contexto>

//nesse exemplo filhoa a e filho b tem acesso ao que tem no contexto
//o contexto é usado para compartinhar um mesmo dado para varios componentes
import {auth, firebase} from './services/firebase'
import { createContext, useState } from "react";
import {BrowserRouter, Route } from "react-router-dom";
import { NewRoom } from "./pages/NewRoom"; 
import { Home } from "./pages/Home";

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

// "{} as AuthContextType" seguinifica que o createContex vai receber um objeto do tipo AuthContextType

export const AuthContext = createContext({} as AuthContextType);

function App() {

  // <User> siguinifica que é do tipo User
  const [user, setUser] = useState<User>();

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

  return (
    <BrowserRouter>
    {/* value{{}} está entre 2 {{}} pq estamos enviando um objeto se fosse uma variavel ou um numero seria {} */}
      <AuthContext.Provider value={{user, signInWithGoogle}}>
        {/* exact siguinifica que a rota tem que ser exatamente do jeito que está no atributo path */}
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContext.Provider>
    </BrowserRouter>
  
  );
}

export default App;