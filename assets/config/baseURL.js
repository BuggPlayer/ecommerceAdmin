import {Platform} from 'react-native';

let baseURL = '';

{
  Platform.OS == 'android'
    ? (baseURL = 'https://bantaibasket-node-deploy.herokuapp.com/api/v1/')
    : (baseURL = 'https://bantaibasket-node-deploy.herokuapp.com/api/v1/');
}
// 'http://localhost:3000/api/v1/

// {
//   Platform.OS == 'android'
//     ? (baseURL = 'http://10.0.2.2/api/v1/')
//     : (baseURL = 'http://localhost:8000/api/v1/');
// }
export default baseURL;
