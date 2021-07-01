
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg"
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import "../styles/room.scss";


type RoomParams = {
    id : string;
}

export function Room() {

    //pega os parametros da url
    //é do tipo RoomParams
    const params = useParams<RoomParams>();
     
    const [newQuestion, setNewQuestion] = useState('')

    const roomId = params.id;

    const {user} = useAuth();

    async function handlerSendQuestion(event: FormEvent){
        event.preventDefault();
        if(newQuestion.trim() == ""){
            return;
        }

        if(!user){
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name:user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        };

        //adciona uma question na room atual
        //seleciona a room que o usuario esta pelo id e adciona uma question nela
        await database.ref(`rooms/${roomId}/questions`).push(question);
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>
            <div className="main">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>
                <form onSubmit={handlerSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?"
                    onChange={event => setNewQuestion(event.target.value)} 
                    value={newQuestion}/>
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>Faça seu login</button>.</span>
                        <Button type="submit" disabled={!user} >Enviar pergunta</Button>
                    </div>
                </form>
            </div>
       </div>
        
    );
}