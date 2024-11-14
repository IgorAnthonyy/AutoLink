import { TextField } from "@mui/material";
import { useEffect, useState, ChangeEvent } from "react";
import InputMask from "react-input-mask";
import UsuarioResponse from "../../interface/IUsuarioReponse";
import { FaPencilAlt } from "react-icons/fa";
import { usuarioPorId } from "../../api/Api";
import UsuarioEdit from "../../interface/IUsuarioEdit";

interface ModalFotoPerfilProps {
    onOpenModalFoto: () => void;
}

const MeusDados: React.FC<ModalFotoPerfilProps> = ({ onOpenModalFoto }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState<UsuarioResponse>({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cep: "",
        imagem: "",
        numero: null,
        logradouro: "",
        complemento: "",
        bairro: "",
        estado: "",
    });
    const [usuarioEdit, setUsuarioEdit] = useState<UsuarioEdit>({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cep: "",
        imagem: null,
        numero: null,
        logradouro: "",
        complemento: "",
        bairro: "",
        estado: "",
    })
    useEffect(() => {
        setLoading(true);
        const storedUsuario = localStorage.getItem("usuario");

        const userFunc = async () => {
            if (storedUsuario) {
                try {
                    const user = JSON.parse(storedUsuario);
                    const response = await usuarioPorId(user.id);
                    setUsuario(response.data);
                    
                    localStorage.setItem("usuario", JSON.stringify(response.data));
                    setLoading(false);
                    
                } catch (error) {
                    setLoading(false);
                    console.error("Erro ao buscar o usuário:", error);
                }
            }
        };

        userFunc();
    }, []);

    useEffect(() => {
      setUsuarioEdit({
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
        telefone: usuario.telefone,
        cep: usuario.cep,
        imagem: null,
        numero: usuario.numero,
        logradouro: usuario.logradouro,
        complemento: usuario.complemento,
        bairro: usuario.bairro,
        estado: usuario.estado,
      })
    },[usuario])
    const handleClickSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Salvando...");
        console.log(usuarioEdit);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      setUsuario((prevUsuario) => ({
          ...prevUsuario,
          [name]: name === "numero" ? parseInt(value, 10) || null : value,
      }));
      
      setUsuarioEdit((prevUsuarioEdit) => ({
          ...prevUsuarioEdit,
          [name]: name === "numero" ? parseInt(value, 10) || null : value,
      }));
  };

    return (
        <div className="h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-5xl mt-4 ml-4 font-bold text-[#464646] uppercase">
                    Meus dados
                </h1>
                {!isEdit && (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="rounded-full font-bold py-2 px-12 bg-[#5271FF] text-white"
                    >
                        Editar
                    </button>
                )}
                {isEdit && (
                    <div className="flex gap-6">
                        <button
                            onClick={() => setIsEdit(false)}
                            className="rounded-full font-bold py-2 px-12 bg-[#1631a7] text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleClickSave}
                            className="rounded-full font-bold py-2 px-12 bg-[#5271FF] text-white"
                        >
                            Salvar
                        </button>
                    </div>
                )}
            </div>
            <div className="flex items-center mt-[10%]">
                {loading && <p>Carregando...</p>}
                {!loading && (
                    <>
                        <div className="w-[30%] relative">
                            {!usuario.imagem ? (
                                <img
                                    width={300}
                                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                                    alt=""
                                />
                            ) : (
                                <img
                                    width={300}
                                    className="rounded-full"
                                    src={`data:image/png;base64,${usuario.imagem}`}
                                    alt=""
                                />
                            )}
                            {isEdit && (
                                <button
                                    onClick={onOpenModalFoto}
                                    className="p-4 bg-[#5271FF] rounded-full text-white absolute top-[80%] right-[30%] border border-black-300"
                                >
                                    <FaPencilAlt size={20} />
                                </button>
                            )}
                        </div>
                        <div className="flex gap-3 w-[60%]">
                            <div className="w-[50%] flex flex-col gap-3">
                                <TextField
                                    className="w-full"
                                    label="Nome"
                                    variant="outlined"
                                    disabled={!isEdit}
                                    name="nome"
                                    value={usuario.nome}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    className="w-full"
                                    label="Sobrenome"
                                    variant="outlined"
                                    disabled={!isEdit}
                                    name="sobrenome"
                                    value={usuario.sobrenome}
                                    onChange={handleInputChange}
                                />
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={usuario.telefone}
                                    onChange={handleInputChange}
                                    disabled={!isEdit}
                                >
                                    {() => (
                                        <TextField
                                            className="w-full"
                                            label="Telefone"
                                            variant="outlined"
                                            name="telefone"
                                            disabled={!isEdit}
                                        />
                                    )}
                                </InputMask>
                                <TextField
                                    className="w-full"
                                    label="E-mail"
                                    variant="outlined"
                                    disabled={!isEdit}
                                    name="email"
                                    value={usuario.email}
                                    onChange={handleInputChange}
                                />
                                <InputMask
                                    mask="99999-999"
                                    value={usuario.cep}
                                    onChange={handleInputChange}
                                    disabled={!isEdit}
                                >
                                    {() => (
                                        <TextField
                                            className="w-full"
                                            label="CEP"
                                            variant="outlined"
                                            name="cep"
                                            disabled={!isEdit}
                                        />
                                    )}
                                </InputMask>
                            </div>
                            <div className="w-[50%] flex flex-col gap-3">
                                <TextField
                                    className="w-full"
                                    label="Endereço"
                                    variant="outlined"
                                    disabled={!isEdit}
                                    name="logradouro"
                                    value={usuario.logradouro}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    className="w-full"
                                    label="Estado"
                                    variant="outlined"
                                    disabled={!isEdit}
                                    name="estado"
                                    value={usuario.estado}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    className="w-full"
                                    label="Complemento"
                                    variant="outlined"
                                    disabled={!isEdit}
                                    name="complemento"
                                    value={usuario.complemento}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    className="w-full"
                                    label="Bairro"
                                    variant="outlined"
                                    disabled={!isEdit}
                                    name="bairro"
                                    value={usuario.bairro}
                                    onChange={handleInputChange}
                                />
                                <InputMask
                                    mask="9999"
                                    value={usuario.numero?.toString() || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEdit}
                                >
                                    {() => (
                                        <TextField
                                            className="w-full"
                                            label="Número"
                                            variant="outlined"
                                            disabled={!isEdit}
                                            name="numero"
                                        />
                                    )}
                                </InputMask>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MeusDados;
