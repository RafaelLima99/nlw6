import { Link } from 'react-router-dom';
import {useContext} from 'react'
import { AuthContext } from '../App';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss'

// toda função que começa com a palavra "use" é um hook
export function NewRoom(){

    const { user } = useContext(AuthContext);

    return(
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simblolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main className="main-content">
                <div>
                    <img src={logoImg} alt="Letmeask" />
                    {/* o user? verifica se o user é undefined
                    ou seja só exibe o user.name se ele não for undefine, só exibe se user.name tiver algum dado*/}
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input type="text"
                        placeholder="Nome da sala"
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