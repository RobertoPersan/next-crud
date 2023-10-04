import Titulo from "./Titulo";

/* Criando um componente Filho, essa é uma forma de garantir que algumas propriedades sejam
exigidas no component
*/
interface LayoutProps {
    titulo: string
    children: any
}

// Criando o Layout do projeto
export default function Layout(props: LayoutProps) {
    return (
        <div className={`
            flex flex-col w-2/3
            bg-white text-gray-800 rounded-md
        `}>
            <Titulo>{props.titulo}</Titulo>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}