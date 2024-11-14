import logo from '../assets/AutoLink.svg';
import { Link, useParams } from 'react-router-dom';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';
import Filtro from '../interface/IFiltro';

const BuscarVeiculo: React.FC = () => {
    const userStorage = localStorage.getItem('usuario');
  const [user] = useState(JSON.parse(userStorage || '{}'));
    const [filtros, setFiltros] = useState<Filtro>({
        proximidade: '',
        categoria: '',
        marcModelo: '',
        preco: {
            de: 0,
            ate: 0,
        },
        quilometragem: 0,
    });

    const { veiculo } = useParams();

    useEffect(() => {
        if (veiculo) {
            setFiltros(prevFiltros => ({
                ...prevFiltros,
                categoria: veiculo, 
            }));
        }
    }, [veiculo]);

    const handleRemoveFiltro = (filtro: string) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            categoria: prevFiltros.categoria === filtro ? '' : prevFiltros.categoria,
            proximidade: prevFiltros.proximidade === filtro ? '' : prevFiltros.proximidade,
            marcModelo: prevFiltros.marcModelo === filtro ? '' : prevFiltros.marcModelo
        }));
    };

    return (
        <div className="box-border overflow-y-hidden">
            <header className="w-full">
                <div className="w-[80%] m-auto flex justify-between items-center">
                    <Link to="/"><img className="w-[200px]" src={logo} alt="Logo" /></Link>
                    <div className="flex gap-[50px] items-center">
                        <div>
                            <input className="rounded-full py-3 px-5 shadow" placeholder="Digite o nome do carro que deseja procurar" type="text" />
                        </div>
                        <Link to="/favoritos">
                            <FaHeart color="#B3B3B3" fontSize="20px" />
                        </Link>
                        {!user.nome ? (
                        <Link to="/login" className="border-2 border-[#5271FF] py-1 px-7 text-[#5271FF] font-bold rounded-full">
                            Entrar
                        </Link>
                        ) : (
                        <Link to="/perfil/meus-dados" className="flex items-center gap-2">
                            <img
                            src={
                                user.imagem === null
                                ? 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
                                : `data:image/png;base64,${user.imagem}`
                            }
                            alt="User Profile"
                            className="w-10 h-10 rounded-full"
                            />
                            <p className="font-bold">{user.nome} {user.sobrenome}</p>
                        </Link>
                        )}
                    </div>
                </div>
            </header>
            <div className="w-fill h-[60px] py-2 px-3 border-b-2 flex items-center">
                {filtros.categoria && (
                    <span className="border-[2px] font-bold border-[#5271FF] text-[#5271FF] py-1 px-5 rounded-full mx-2 flex items-center gap-3">
                        {filtros.categoria}
                        <button onClick={() => handleRemoveFiltro(filtros.categoria)}>
                            <FaTimes color="#5271FF" />
                        </button>
                    </span>
                )}
                {filtros.proximidade && (
                    <span className="border-[2px] font-bold border-[#5271FF] text-[#5271FF] py-1 px-5 rounded-full mx-2 flex items-center gap-3">
                        Distância de {filtros.proximidade} km
                        <button onClick={() => handleRemoveFiltro(filtros.proximidade)}>
                            <FaTimes color="#5271FF" />
                        </button>
                    </span>
                )}
                {filtros.marcModelo && (
                    <span className="border-[2px] font-bold border-[#5271FF] text-[#5271FF] py-1 px-5 rounded-full mx-2 flex items-center gap-3">
                        {filtros.marcModelo}
                        <button onClick={() =>{
                            setFiltros(prevFiltros => ({
                                ...prevFiltros,
                                marcModelo: '',
                            }))
                        } }>
                            <FaTimes color="#5271FF" />
                        </button>
                    </span>
                )}
                {filtros.preco.de || filtros.preco.ate ? (
                    <span className="border-[2px] font-bold border-[#5271FF] text-[#5271FF] py-1 px-5 rounded-full mx-2 flex items-center gap-3">
                        {`R$${filtros.preco.de} - R$${filtros.preco.ate}`}
                        <button onClick={() => {
                            setFiltros(prevFiltros => ({
                                ...prevFiltros,
                                preco: { de: 0, ate: 0 },
                            }));
                        }}>
                            <FaTimes color="#5271FF" />
                        </button>
                    </span>
                ) : null}
                {filtros.quilometragem > 0 && (
                    <span className="border-[2px] font-bold border-[#5271FF] text-[#5271FF] py-1 px-5 rounded-full mx-2 flex items-center gap-3">
                        {`Até ${filtros.quilometragem} km`}
                        <button onClick={() => {
                            setFiltros(prevFiltros => ({
                                ...prevFiltros,
                                quilometragem: 0,
                            }));
                        }}>
                            <FaTimes color="#5271FF" />
                        </button>
                    </span>
                )}
            </div>
            <div className="flex">
                <div className="w-[20%] h-[81vh] overflow-y-scroll border-r-2 flex flex-col p-4">
                    <div>
                        <h2 className="font-bold mb-2">Proximidade</h2>
                        <TextField fullWidth label="Minha localização" type="text" />
                        <div className="mt-3">
                            
                            <TextField fullWidth 
                             onChange={(e) => {
                                setFiltros(prevFiltros => ({
                                    ...prevFiltros,
                                    proximidade: e.target.value,
                                }));
                            }}
                            value={filtros.proximidade}
                            label="Até" type="number" />
                        </div>
                        <div className="mt-3 mb-1 h-[1px] w-full bg-[#C4C4C4]" />
                    </div>
                    <div>
                        <h2 className="font-bold mb-2">Categoria</h2>
                        <FormControl fullWidth>
                            <InputLabel id="categoria-label">Categoria</InputLabel>
                            <Select
                                labelId="categoria-label"
                                value={filtros.categoria}
                                onChange={(e)=> {
                                    setFiltros(prevFiltros => ({
                                        ...prevFiltros,
                                        categoria: e.target.value,
                                    }));
                                }}
                                label="Categoria"
                            >
                                <MenuItem value={'carro'}>Carro</MenuItem>
                                <MenuItem value={'moto'}>Moto</MenuItem>
                                <MenuItem value={'caminhão'}>Caminhão</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="mt-3 mb-1 h-[2px] w-full bg-[#C4C4C4]" />
                    </div>
                    <div>
                        <h2 className="font-bold mb-2">Marca e modelo</h2>
                        <TextField fullWidth label="Digite o veículo"
                        onChange={(e) => {
                            setFiltros(prevFiltros => ({
                                ...prevFiltros,
                                marcModelo: e.target.value,
                            }));
                        }}
                        value={filtros.marcModelo}
                        type="text" />
                        <div className="mt-3 mb-1 h-[2px] w-full bg-[#C4C4C4]" />
                    </div>
                    <div>
                        <h2 className="font-bold mb-2">Preço</h2>
                        <div className="flex gap-1">
                            <div>
                                <TextField
                                    label="De"
                                    type="number"
                                    value={filtros.preco.de}
                                    onChange={(e) => setFiltros(prevFiltros => ({
                                        ...prevFiltros,
                                        preco: {
                                            ...prevFiltros.preco,
                                            de: parseFloat(e.target.value),
                                        },
                                    }))}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Até"
                                    type="number"
                                    value={filtros.preco.ate}
                                    onChange={(e) => setFiltros(prevFiltros => ({
                                        ...prevFiltros,
                                        preco: {
                                            ...prevFiltros.preco,
                                            ate: parseFloat(e.target.value),
                                        },
                                    }))}
                                />
                            </div>
                        </div>
                        <div className="mt-3 mb-1 h-[2px] w-full bg-[#C4C4C4]" />
                    </div>
                    <div>
                    <h2 className="font-bold mb-2">Quilometragem</h2>
                    <TextField fullWidth label="Digite a quilometragem"
                        onChange={(e) => {
                            setFiltros(prevFiltros => ({
                                ...prevFiltros,
                                quilometragem: parseFloat(e.target.value),
                            }));
                        }}
                        value={filtros.quilometragem}
                        type="number" />
                </div>
              
                </div>
                <div className="w-full bg-[#ECECEC]">
                    
                </div>
                
            </div>
        </div>
    );
};

export default BuscarVeiculo;
