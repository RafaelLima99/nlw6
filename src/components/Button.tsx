// 'ButtonHTMLAttributes: declara todos os atributos que um button pode ter
// para n�o ter que escrever de um por um no type
//podemos ver isso se clicar no {ButtonHTMLAttributes} com o ctrl, ai ele mostra onde esta interface est�


import { ButtonHTMLAttributes } from "react"
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button (props: ButtonProps) {
    return(
        <button className="button" {...props}/>

    )
}