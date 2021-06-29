import { useState } from 'react';
import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';


// toda função que começa com a palavra "use" é um hook

export function NewRoom(){

    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');
   
    

    // o tipo FormEvent vem de um import chamdo FormEvent
    async function handleCreateRoom(event: FormEvent) {
        // preventDefaul retirar a função padrão do evento 
        // que no caso do evento de um formulário é redirecionar para outra pagina ou recarregar a pagina
        // nesse caso o preventDefault impede que isso aconteça
        event.preventDefault();

        // trim remove os espaços de uma string
        if(newRoom.trim() === ''){
            return;
        }
        //ref ou referencia é como se fosse uma tabela no banco de dados do firebase
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id 
        })
        
        //não é aspas e sim crase
        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simblolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    {/* o user? verifica se o user é undefined
                    ou seja só exibe o user.name se ele não for undefine, só exibe se user.name tiver algum dado*/}
                    {/* <h1>{user?.name}</h1> */}
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text"
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}