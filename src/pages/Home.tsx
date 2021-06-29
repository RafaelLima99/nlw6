import { useHistory } from "react-router-dom";
import {FormEvent, useState} from 'react'

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss'
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function Home(){

    const history = useHistory();

    //Recebe o contexo AuthContex que esta no component App
    //esse AuthContext tem o user e o signInWithGoogle 
    //que tem informações da pessoa logada(user), e tbm tem a função de logar(signInWithGoogle)
    const {user, signInWithGoogle} = useAuth()

    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
        //se o usuario não estiver logado
        if(!user){
           await signInWithGoogle()
        }

        //caso esteja
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        
        if(roomCode.trim() === ''){
            return;
        }

        //procura sala pelo roomCode no firebase e pega seus dados
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists.')
            return;
        }

        history.push(`/rooms/${roomCode}`)
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text"
                        placeholder="Digite o código da sala"
                        onChange={ event => setRoomCode(event.target.value)}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}