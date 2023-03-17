import UrlsManager from '../services/Urls.Api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const Redirect = () => {

    const { shorturl } = useParams()
  
    
    useEffect(() => {

        const getFull = async () => {
            const response = await UrlsManager.redirect(shorturl)
                    
            window.location.href= (response.data.fullUrl)
        }
        getFull()

    }, [])
    

    return <>

    </>
}

export default Redirect