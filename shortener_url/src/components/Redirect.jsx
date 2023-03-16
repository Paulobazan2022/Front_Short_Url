import UrlsManager from '../services/Urls.Api';
import { redirect, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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