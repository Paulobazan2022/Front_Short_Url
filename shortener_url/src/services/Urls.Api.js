import axios from "axios";

class UrlsManager {
  static async getShortUrl(url, token) {
    const data = {
      fullUrl: url,
    };
    const authAxios = axios.create({
      headers: { authorization: token },
    });
    const response = await authAxios.post(
      `${process.env.REACT_APP_API_URL}/url/short-url`,
      data
    );
    return response;
  }

  static async getUrls(token) {

    const authAxios = axios.create({
      headers: { authorization: token },
    });
    const response = await authAxios.get(`${process.env.REACT_APP_API_URL}/url/get-urls`);
    return response;
  }

  static async setUrl(id, newUrl, token){
    const data = {
      idUrl:id,
      newUrl : newUrl
    }
    const authAxios = axios.create({
      headers: { authorization: token },
    });
    const response = await authAxios.patch(`${process.env.REACT_APP_API_URL}/url/update-url`, {idUrl:id, newUrl :newUrl})
    return response
  }

  static async delete(id, token){
    const data = {
      idUrl: id,
    };
    const authAxios = axios.create({
      headers: { authorization: token }
    });

    const response = await authAxios.delete(`${process.env.REACT_APP_API_URL}/url/delete-url`, {data})
    return response
  }

  static async redirect (shortUrl){

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/${shortUrl}`)
    return response
  }
}

export default UrlsManager;
