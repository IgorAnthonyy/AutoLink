export default interface UsuarioEdit {
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    cep: string;
    imagem: File | null ;
    numero: number | null;
    logradouro: string;
    complemento: string;
    bairro: string;
    estado: string;
  }
  