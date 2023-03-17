import { useUserContext } from '../context/Context.User'
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import "../assets/Menu.css"
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import UrlsManager from '../services/Urls.Api';
import NavBar from './NavBar';
import logo from '../assets/logo.png'

const Home = () => {

    const [url, setUrl] = useState()
    const [shortUrl, setShortUrl] = useState()
    const [full, setFull] = useState()
    const contextUser = useUserContext()
    const navigate = useNavigate()

    const sendUrl = async () => {
        if (await contextUser.user[0].isLogin === false) {
            navigate("/log-in")
        }
        else {
            const response = await UrlsManager.getShortUrl(url, contextUser.user[0].token)
            setShortUrl(response.data.short)
            setFull(response.data.full)
            setUrl("")
        }
    }

    const sendFull = (shortUrl) => {
        window.open(`${process.env.REACT_APP_URL}/${shortUrl}`)
    }
    return <>
        <NavBar />
        <Container>
            <Row className="justify-content-md-center">
                <Col md="5">
                    <img className='logo_home' src={logo} alt={logo} />
                </Col>
                <Col md="5">
                    <h1 className='text_Home'>Acorta los enlaces de tu Dominio</h1>
                    <br />
                    <h4>Acorta, gestiona y comparte tus URLS</h4>
                </Col>

            </Row>
        </Container>
        <div className='container_input'>
            <div className='container_box_input'>
                <input type="text" placeholder='Ingrese una Url' className='input_1' value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className='container_box_input'>
                <Button onClick={() => sendUrl()} size='lg'>Acortar</Button>
            </div>
        </div>
        <Container >
            {shortUrl && <Row className="container_short">
<Col></Col>
                <Col md="4">
                    <h3>Tu Url acotada es la siguiente....</h3>
                </Col>
                <Col md="4">
                    <a className='short_url' onClick={() => sendFull(shortUrl)}>{`${process.env.REACT_APP_URL}/${shortUrl}`}</a>
                </Col>
                <Col></Col>
            </Row>}

        </Container>

    </>
}


export default Home;