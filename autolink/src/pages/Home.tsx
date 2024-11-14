import { useState } from 'react';
import logo from '../assets/AutoLink.svg';
import logoBranca from '../assets/logoBranca.png';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaHeart, FaInstagram, FaFacebook } from 'react-icons/fa';
import TypingText from '../hooks/TypingText';

const Home = () => {
  const userStorage = localStorage.getItem('usuario');
  const [user] = useState(JSON.parse(userStorage || '{}'));
  console.log(user);
  const [dropList, setDropList] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  return (
    <div>
      <header className="w-full fixed bg-white top-0">
        <div className="w-[80%] flex justify-between items-center mx-auto">
          <img className="w-[200px]" src={logo} alt="AutoLink logo" />
          <nav className="flex gap-[30px]">
            <button
              className="flex items-center gap-[10px]"
              onClick={() => setDropList(!dropList)}
            >
              Comprar {dropList ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {dropList && (
              <div className="flex flex-col absolute top-[80%] right-[49%] text-center p-5 gap-5 bg-white z-10">
                <Link to="/buscar-veiculo/carro">Carros</Link>
                <Link to="/buscar-veiculo/moto">Motos</Link>
                <Link to="/buscar-veiculo/caminhão">Caminhões</Link>
              </div>
            )}
            <Link to="/perfil">Anunciar carro</Link>
          </nav>
          <div className="flex items-center gap-10">
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
      <div className={`box-border mt-[70px] w-full h-[70vh] bg-no-repeat bg-cover p-[30px_40px] ${styles.banner}`}>
        <div>
          <h3 className="text-5xl text-white w-[50%] h-[120px]">
            Realize {' '}
            <TypingText
              text="agora o desejo de ter o carro que sempre sonhou!"
              typingSpeed={50}
              loopDelay={2000}
            />
          </h3>
          <p className="text-lg w-[50%] text-white mt-[50px] mb-[70px]">
            Aproveite esta oportunidade e leve para casa o veículo ideal para você. Não perca tempo e comece a dirigir o futuro que sempre desejou!
          </p>
          <form className="relative">
            <input
              className="w-[40%] h-[50px] p-[30px] rounded-full text-lg"
              type="text"
              placeholder="Pesquise o seu veículo dos sonhos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute left-[30.7%] top-[3px] p-[15px] w-[130px] font-bold bg-[#5271FF] text-white rounded-full">
              Pesquisar
            </button>
          </form>
        </div>
      </div>
      <div className="p-[30px] font-bold">
        <h2>VEÍCULOS MAIS VENDIDOS</h2>
      </div>
      <div className="p-[30px] bg-[#F4F4F4] font-bold">
        <h2>BUSCAR POR PREÇO</h2>
      </div>
      <footer className="bg-[#5271FF] text-white flex gap-[80px] p-[40px] items-start">
        <img src={logoBranca} alt="AutoLink logo" className="w-[150px]" />
        
        <div className="flex flex-col gap-[20px]">
          <h4 className="text-[20px]">Navegação</h4>
          <div className="flex flex-col gap-[10px]">
            <Link to="/" className="text-white text-[16px]">Home</Link>
            <Link to="/comprar" className="text-white text-[16px]">Comprar carros</Link>
            <Link to="/anunciar" className="text-white text-[16px]">Anunciar carros</Link>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <h4 className="text-[20px]">Siga o AutoLink</h4>
          <div className="flex gap-[10px]">
            <Link to="/" className="text-white">
              <FaInstagram fontSize={30} />
            </Link>
            <Link to="/comprar" className="text-white">
              <FaFacebook fontSize={30} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
