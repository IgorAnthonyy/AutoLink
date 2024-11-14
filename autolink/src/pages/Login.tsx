import styles from './Login.module.css';
import logo from '../assets/AutoLink.svg';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { logar } from '../api/Api';
import { toast } from 'react-toastify';
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement> ) =>{
      e.preventDefault()
      try{
        const response = await logar(email,senha)
        console.log(response.data)
        localStorage.setItem('usuario', JSON.stringify(response.data))
        localStorage.setItem('token', response.data.token)
        toast.success('Login efetuado com sucesso',{autoClose: 700})
        setTimeout(()=>{
          navigate('/perfil/meus-dados')
        }, 1400)
      }catch(e){
        toast.error('Email ou senha incorretos',{autoClose: 700})
      }
    }
  return (
    <div className="flex ">
       <div className={styles.imagem}></div>
       <div className="flex flex-col items-center w-[50%] justify-center">
            <Link to='/'><img src={logo} alt="AutoLink" /></Link>
            <h1 className="text-3xl font-bold mb-[10px]">FAÇA O LOGIN</h1>
            <p className="mb-[50px]">Ainda não possui conta? <Link to='/cadastrar' className="text-[#5271FF]">Cadastre-se</Link></p>
            <form 
            className="flex flex-col gap-4 w-[50%]"
            onSubmit={handleSubmit}>
                <TextField 
                label="Digite seu e-mail" 
                type='email' value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                />
                <TextField label="Digite sua senha" type='password' value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button
                className="w-full bg-[#5271FF] text-white py-2 rounded-full font-bold"
                >Entrar</button>
            </form>
       </div>
    </div>
  );
};

export default Login;
