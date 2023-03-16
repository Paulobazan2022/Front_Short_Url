import axios from "axios";

class UserManager {
  static async LogIn(username, password) {
    const data = {
      username: username,
      password: password,
    };
  
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/sig-in`,
      data
    );
    return response;
  }

  static async Register(name, username, password){
    const data = {
      name : name,
      username: username,
      password: password,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/resgister`,
      data
    );

    return response
  }
}

export default UserManager;
