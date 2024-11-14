import { useEffect, useState } from "react";
import { FaImage } from 'react-icons/fa';

interface ModalFotoPerfilProps {
    onCloseModal: () => void;
}

const ModalFotoPerfil: React.FC<ModalFotoPerfilProps> = ({ onCloseModal }) => {
    const [imagemStorage, setImagemStorage] = useState<string | null>(null);
    const [imagem, setImagem] = useState<File | null>(null);
    const [objectFile, setObjectFile] = useState<string>("");

    useEffect(() => {
        const userString = localStorage.getItem("usuario");
        if (userString) {
            const user = JSON.parse(userString);
            if (user.imagem) {
                setImagemStorage(user.imagem);
            }
        }
    }, []);

    const handleChangeFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagem(file);
            setObjectFile(URL.createObjectURL(file));
        }
    };

    return (
        <div className="absolute z-20 bg-[#212121ac] w-full h-full flex justify-center items-center">
            <div className="w-[30%] p-6 h-[60%] bg-white rounded-md">
                <div className="w-full h-[90%] bg-[#c4c4c4] relative">
                    
                    {objectFile ? (
                        <img src={objectFile} className="w-full h-full object-cover" alt="Foto de perfil" />
                    ) : imagemStorage ? (
                        <img src={`data:image/png;base64,${imagemStorage}`} className="w-full h-full object-cover" alt="Foto de perfil armazenada" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FaImage color="#434343" size={40} />
                        </div>
                    )}
                    
                    <input
                        type="file"
                        onChange={handleChangeFoto}
                        className="absolute top-[85%] right-10 bg-[#888888] p-2 rounded-full text-sm"
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <button className="px-6 py-2 bg-[#5271FF] rounded-full text-white font-bold">Concluir</button>
                    <button onClick={onCloseModal} className="px-6 py-2 text-[#5271FF] font-bold rounded-full border-2 border-[#5271FF]">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalFotoPerfil;
