import Table from 'react-bootstrap/Table';
import { useUserContext } from '../context/Context.User'
import Button from 'react-bootstrap/Button';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import "../assets/UserMenu.css"
import UrlsManager from '../services/Urls.Api';
import NavBar from './NavBar';

const UserMenu = () => {

    const [urls, setUrls] = useState()
    const [renderMap, setRenderMap] = useState(false)
    const [newUrl, setNewUrl] = useState()


    const contextUser = useUserContext()

    useEffect(() => {
        let token = contextUser.user[0].token
        const getUrls = async () => {
            const response = await UrlsManager.getUrls(token)
            setUrls(response.data.urlsData)
            setRenderMap(true)
        }
        getUrls()

    }, [])

    const setUrl = async (id) => {
        let token = contextUser.user[0].token
        try {
            await UrlsManager.setUrl(id, newUrl, token)
            const response = await UrlsManager.getUrls(token)
            setUrls(response.data.urlsData)
        } catch (e) {

        }
    }

    const deleteUrl = async (id) => {

        let token = contextUser.user[0].token
        try {
            await UrlsManager.delete(id, token)
            const newUrls = urls.filter((url) => url.idUrl !== id)
            setUrls(newUrls)
        } catch (e) {

        }
    }


    return <>
        <NavBar />
        <Container>
            <Row>
                <Col md='8' className='text_userMenu'>
                    <h1>Gestiona facilmente tus dominios guardados</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table hover responsive >
                        <thead >
                            <tr>
                                <th>URL LARGA</th>
                                <th>URL ACORTADA</th>
                                <th>MODIFICACION</th>
                            </tr>
                        </thead>
                        {renderMap && urls.map((data) =>
                            <tbody key={data.idUrl} >
                                <tr>
                                    <td><p>URL Actual... {data.fullurl}</p>
                                        <input type="text" className='input_UserMen' onChange={(e) => setNewUrl(e.target.value)} /></td>
                                    <td><p>{`${process.env.REACT_APP_URL}/${data.shortUrl}`}</p></td>
                                    <td>
                                        <Button variant='outline-secondary' size='sm' onClick={() => setUrl(data.idUrl)}>MODIFICAR</Button>
                                        <Button variant='outline-secondary' size='sm' onClick={() => deleteUrl(data.idUrl)}>BORRAR</Button>
                                    </td>
                                </tr>
                            </tbody>)}
                    </Table>
                </Col>
            </Row>
        </Container>

    </>

}


export default UserMenu