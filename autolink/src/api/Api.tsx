import axios from 'axios'
import IUsuario from '../interface/IUsuario'
const api = ()=>{
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })
}

const criarUsuario = async (usuario : IUsuario)=>{
    const apiIntance = api()
    return apiIntance.post('/usuarios', usuario, {
        headers: {
            'Content-Type': 'application/json',
          },
    })
}
const logar = async (email : string , senha : string)=>{
    const apiIntance = api()
    return apiIntance.post('/usuarios/login', {email,senha}, {
        headers: {
            'Content-Type': 'application/json',
          },
    })
}
const usuarioPorId = async (id : number)=>{
    const apiIntance = api()
    const token = localStorage.getItem('token')
    return apiIntance.get(`/usuarios/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }})
}

export {
    criarUsuario,
    logar,
    usuarioPorId
}