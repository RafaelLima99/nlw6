import { Link } from 'react-router-dom';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss'

// toda função que começa com a palavra "use" é um hook
export function NewRoom(){

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