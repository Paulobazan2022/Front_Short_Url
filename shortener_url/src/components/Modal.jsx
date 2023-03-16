import '../assets/modal.css'
import { useState } from 'react';
import Button from "react-bootstrap/esm/Button";

const Modal = (props) => {
    const [MsgErrors, setMsgEerrors] = useState(props.textErrors)
    return <>
        <div className="containerModal">

            <div className="containerModal_1" onClick={props.back}>

                <h1 className="textModal">{props.title}</h1>
                {MsgErrors ? MsgErrors.map((error, i) => <p key={i} className="textModal_P">{error.msg}</p>) : 
                    <h5 className="textModal_P">{props.text}</h5>}
                <Button className="btnModal" onClick={props.route}>ACEPTAR</Button>
            </div>
        </div>
    </>
}

export default Modal