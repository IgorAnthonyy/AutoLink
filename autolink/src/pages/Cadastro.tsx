import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import InputMask from 'react-input-mask';
import axios from 'axios';
import IUsuario from '../interface/IUsuario';
import { criarUsuario } from '../api/Api';
import { toast } from 'react-toastify';


const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [repetirSenha, setRepetirSenha] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [usuario, setUsuario] = useState<IUsuario>({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    telefone: '',
    cep: '',
    numero: null,
    logradouro: '',
    complemento: '',
    bairro: '',
    estado: '',
  });

  useEffect(() => {
    if (usuario.senha !== repetirSenha) {
      setError("As senhas não coincidem!");
    }else {
      setError("")
    }
  }, [repetirSenha]);

  const handleChange = (field: keyof IUsuario) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = field === 'numero' ? (value ? Number(value) : null) : value;

    setUsuario({
      ...usuario,
      [field]: newValue,
    });
  };

  const buscarEndereco = async (cep: string) => {
    if (cep.length !== 9) {
      toast.error("CEP inválido! O CEP deve ter 8 dígitos.");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        setUsuario((prevState) => ({
          ...prevState,
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          estado: data.uf || '',
        }));
      } else {
        toast.error("CEP não encontrado!");
      }
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(usuario));
    if(error !== ""){
      try {
        await criarUsuario(usuario);
        toast.success("Usuário criado com sucesso!", { autoClose: 400 });
        setTimeout(() => {
          navigate('/login');
        }, 800);
      } catch (error) {
        toast.error("Erro ao criar o usuário");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl font-bold">CRIE SUA CONTA</h1>
      <p className="my-2">
        Já possui conta? <Link to="/login" className="text-[#5271FF]">Entrar</Link>
      </p>
      <p className="w-[37%] text-center">
        Ao continuar você concorda com a <Link to="/politica" className="text-[#5271FF]">Política de privacidade</Link> e <Link to="/termo" className="text-[#5271FF]">Termo de uso</Link>.
      </p>
      <form onSubmit={handleSubmit} className="w-[48%] mt-8">
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 w-full">
            <TextField label="Nome" type="text" value={usuario.nome} onChange={handleChange('nome')} required />
            <TextField label="Sobrenome" type="text" value={usuario.sobrenome} onChange={handleChange('sobrenome')} required />
            <TextField label="E-mail" type="email" value={usuario.email} onChange={handleChange('email')} required />
            <div className="flex gap-2">
              <TextField label="Senha" type="password" value={usuario.senha} onChange={handleChange('senha')} required />
              <TextField label="Repetir-senha" type="password" value={repetirSenha} onChange={(e) => setRepetirSenha(e.target.value)} required />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <InputMask mask="(99) 99999-9999" value={usuario.telefone} onChange={handleChange('telefone')}>
              {(inputProps: TextFieldProps) => (
                <TextField {...inputProps} label="Telefone" type="text" required />
              )}
            </InputMask>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-2">
              <InputMask mask="99999-999" value={usuario.cep} onChange={(e) => {
                  handleChange('cep')(e);
                  if (e.target.value.length === 9) {
                    buscarEndereco(e.target.value);
                  }
                }}>
                {(inputProps: TextFieldProps) => (
                  <TextField {...inputProps} label="CEP" type="text" required />
                )}
              </InputMask>
              <TextField label="Número" type="number" value={usuario.numero ?? ''} onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : null;
                  setUsuario({ ...usuario, numero: value });
                }} required />
            </div>
            <TextField label="Rua" type="text" value={usuario.logradouro} onChange={handleChange('logradouro')} required />
            <TextField label="Complemento" type="text" value={usuario.complemento} onChange={handleChange('complemento')} />
            <TextField label="Bairro" type="text" value={usuario.bairro} onChange={handleChange('bairro')} required />
            <TextField label="Estado" type="text" value={usuario.estado} onChange={handleChange('estado')} required />
          </div>
        </div>
        <button type="submit" className="mt-5 bg-[#5271FF] py-2 w-full font-bold rounded-full text-white hover:bg-[#365bff]">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
