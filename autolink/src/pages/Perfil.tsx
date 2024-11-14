import { useParams, Link, useNavigate } from "react-router-dom";
import logo from '../assets/AutoLink.svg'
import iconUserBranco from '../assets/User.svg'
import iconUserCinza from '../assets/userCinza.svg'
import iconsPlusCinza from '../assets/Icon.svg'
import iconsPlusBranco from '../assets/Plus circle.svg'
import heart from '../assets/Heart.svg'
import heartBranco from '../assets/HeartBranco (1).svg'
import MeusDados from "../components/ProfileTabs/MeusDados";
import ModalFotoPerfil from "../components/ModalFotoPerfil";
import { useState } from "react";
const Perfil: React.FC = () => {
    const navigate = useNavigate();
    const [isModalFotoPerfil, setIsModalFotoPerfil] = useState(false);
    const storedUser = localStorage.getItem("usuario");
    const [user] = useState(JSON.parse(storedUser || '{}'));
    const { aba } = useParams();
    const classeParaOsLinks = (nomeAba: string) => `flex items-center font-bold gap-2 text-xl w-full py-2 px-4 rounded-full  
                                ${aba === nomeAba ? 'bg-[#5271FF] text-white' : 'text-[#464646]'}`;
    return (
        <div className="bg-[#ececec]">
            {isModalFotoPerfil && <ModalFotoPerfil onCloseModal={()=>setIsModalFotoPerfil(false)} />}
            <header className="w-full fixed bg-white">
                <div className="w-[90%] m-auto">
                    <Link to="/">
                    <img className="w-[200px]" src={logo} alt="logo" />
                    
                    </Link>
                </div>
            </header>
            <div className="flex h-[100vh]">
                <div className="w-[20%] h-full bg-white items-center justify-between flex flex-col p-4">
                    <div className="mt-[90px] flex flex-col items-center">
                        {user && user.imagem === null && <img className="w-[150px]" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="" />}
                        {user && user.imagem && <img className="w-[150px] rounded-full" src={`data:image/png;base64,${user.imagem}`} alt="" />}
                        <h2 className="font-bold text-xl">{user && user.nome ? user.nome + " " + user.sobrenome : "Nome do usuário"}</h2>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <Link to='/perfil/meus-dados' className={classeParaOsLinks('meus-dados')} >
                                <img src={aba === "meus-dados" ? iconUserBranco : iconUserCinza} alt="" /> Meus dados
                        </Link>
                        <Link to='/perfil/anunciar-veiculo' className={classeParaOsLinks('anunciar-veiculo')}>
                                <img  src={aba === "anunciar-veiculo" ? iconsPlusBranco : iconsPlusCinza} alt="" /> Anunciar veiculo
                        </Link>
                        <Link to='/perfil/favoritos' className={classeParaOsLinks('favoritos')}>
                                <img src={aba === "favoritos" ? heartBranco : heart} alt="" /> Favoritos
                        </Link>
                      
                    </nav>
                    <button 
                    onClick={()=>{
                        localStorage.removeItem("usuario")
                        localStorage.removeItem("token")
                        navigate('/')
                    }}
                    className="py-2 w-full text-white font-bold bg-[#5271FF] rounded-full">Sair</button>
                </div>
                <div className="w-[80%] mt-[90px] px-4">
                    {aba === 'meus-dados' && <MeusDados onOpenModalFoto={()=>setIsModalFotoPerfil(true)}/>}
                    {aba === 'anunciar-veiculo' && <h1>Anunciar Veiculo</h1>}
                    {aba === 'favoritos' && <h1>Favoritos</h1>}
                </div>
            </div>
        </div>
    )
}
export default Perfil;