export default interface Filtro {
    proximidade: string;
    categoria: string;
    marcModelo: string;
    preco: {
        de: number;
        ate: number;
    };
    quilometragem: number;
}