import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useForm } from 'react-hook-form'
import "../assets/LogIn.css"
import UserManager from "../services/Users.Api"
import { useUserContext } from '../context/Context.User'
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import Modal from "./Modal";

const Register = () => {
    
    const [error, setError] = useState(false)
    const [logged, setLogged] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    const userContext = useUserContext()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {

        try {
            const response = await UserManager.Register(data.name, data.userName, data.password)
            const newUser = userContext.user.map((info) => { return { ...info, name: response.data.name, user: data.userName, token: response.data.token, isLogin: true } })
            userContext.setUser(newUser)
            setLogged(true)
        } catch (error) {
            setError(true)
            setErrorMsg(error.response.data.errorsMsg[0].msg)
        }
    }

    return (<>
        <NavBar />
        <div className="container_login">
            
                <form onSubmit={handleSubmit(onSubmit)} className="container_text">
                    <h2 className="text_log">Rellena los campos </h2>

                    <input type="text" placeholder="Introduce tu nombre completo" className="input_log" {...register('name', {
                        required: true,
                        minLength: 3
                    })} />
                    {errors.name?.type === 'required' && <p className="p_error">Este campo es necesario</p>}
                    {errors.name?.type === 'minLength' && <p className="p_error">Longitud del nombre no valida</p>}

                    <input type="text" placeholder="introduce tu email" className="input_log"{...register('userName', {
                        required: true,
                        pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                    })} />
                    {errors.userName?.type === 'required' && <p className="p_error">Es necesario rellenar este campo</p>}
                    {errors.userName?.type === 'pattern' && <p className="p_error">Introduzca un email valido</p>}

                    <input type="password" placeholder="introduce una contraseña" className="input_log"  {...register('password', {
                        required: true,
                        pattern: /^(?=.*[0-9])(?=.*[!@#$%^&.*])[a-zA-Z0-9!@#$%^&.*]{6,16}$/
                    })} />
                    {errors.password?.type === 'required' && <p className="p_error">Es necesario rellenar este campo</p>}
                    {errors.password?.type === 'pattern' && <p className="p_error">Contraseña no valida</p>}

                    <p >La contraseña tiene que tener una mayúscula, una minúscula y un carácter especial</p>
                    <Button type="submit">Enviar</Button>
                </form>
            
        </div>
        {error && <Modal title="Ha ocurrido un error" text={errorMsg} route={() => setError(false)} />}
        {logged && <Modal title="BIENVENIDO" text={`bienvenido ${userContext.user[0].name}`} route={() => navigate("/")} />}
    </>
    );

}

export default Register;