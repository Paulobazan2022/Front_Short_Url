import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import "../assets/LogIn.css"
import UserManager from "../services/Users.Api"
import { useUserContext } from '../context/Context.User'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Modal from "./Modal";
import { useForm } from "react-hook-form";

const Login = () => {

    const [error, setError] = useState(false)
    const [logged, setLogged] = useState(false)
    const userContext = useUserContext()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
       
        try {
            const response = await UserManager.LogIn(data.userName, data.password)
            const newUser = userContext.user.map((info) => { return { ...info, name: response.data.name, user: data.userName, token: response.data.token, isLogin: true } })
            userContext.setUser(newUser)
            setLogged(true)
        } catch (error) {
            setError(true)
        }
    }
    return (<>
        <NavBar />
        <div className="container_login">
            
                <form onSubmit={handleSubmit(onSubmit)} className="container_text">
                    <h2 className="text_log">INICIA SESION</h2>

                    <input placeholder="introduzca su email" className="input_log" {...register('userName', {
                        required: true,
                        pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                    })} />
                    {errors.userName?.type === 'required' && <p className="p_error">Es necesario rellenar este campo</p>}
                    {errors.userName?.type === 'pattern' && <p className="p_error">Introduzca un email valido</p>}

                    <input type="password" placeholder="introduzca su contraseña" className="input_log" {...register('password', {
                        required: true
                    })} />
                    {errors.password?.type === 'required' && <p className="p_error">Es necesario rellenar este campo</p>}
                    <Button type="submit" >Enviar</Button>
                </form>
            <div className="container_text">
                <p className="text_log">------ o ------</p>
                <h4 className="text_log">Si no tiene cuenta aún, puedes registrarte aqui</h4>
                <Button onClick={() => navigate('/users/register')}>REGISTRARSE</Button>
            </div>
        </div>
        {error && <Modal title="Ha ocurrido un error" text="usuario y/o contraseña no encontrado" route={() => setError(false)} />}
        {logged && <Modal title="BIENVENIDO" text={`bienvenido ${userContext.user[0].name}`} route={() => navigate("/")} />}
    </>);

}

export default Login;