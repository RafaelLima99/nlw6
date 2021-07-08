
import { useEffect } from "react";
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

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}> 

type Questions = {
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;

}
    


export function Room() {

    //pega os parametros da url
    //é do tipo RoomParams
    const params = useParams<RoomParams>();
     
    const [newQuestion, setNewQuestion] = useState('') ;
    const [questions, setQuestions] = useState <Questions[]>([]);
    const [title, setTitle] = useState('');

    const roomId = params.id;

    const {user} = useAuth();

    //função acionada quando o valor da varial roomId é mudado ou quando esse componet é exibido em tela
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            //converte o objeto para array
            const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
                 
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                 }

            })
            
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
            
        })

    }, [roomId]);


    async function handlerSendQuestion(event: FormEvent){

        event.preventDefault();

        if(newQuestion.trim() === ""){
            return;
        }

        if(!user){
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name:user.name,
                avatar: user.avatar
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
                    <h1>Sala {title}</h1>
                   {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <form onSubmit={handlerSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?"
                    onChange={event => setNewQuestion(event.target.value)} 
                    value={newQuestion}/>
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img alt="foto" src={user.avatar}/>
                                <span>{user.name}</span>
                            </div>
                        ) : (   
                            <span>Para enviar uma pergunta, <button>Faça seu login</button>.</span>
                        ) }
                        <Button type="submit" disabled={!user} >Enviar pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </div>
       </div>
        
    );
}