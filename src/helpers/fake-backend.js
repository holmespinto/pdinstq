import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { environment } from '../environments/environments';
import { setItemStorage } from '../pages/dashboard/components/itemStorage';
import { APICore } from './api/apiCore';

const api = new APICore();

var mock = new MockAdapter(axios);

export function configureFakeBackend() {
  mock.onPost('/login/').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // get parameters from post request
        let params = JSON.parse(config.data);
        let CryptoJS = require('crypto-js');
        const url = `${environment.baseURL}accion=usuarios&opcion=consultarusuario&username=${params?.username}`;
        const Usuarios = api.getDatos(`${url}`);
        Usuarios.then(function (response) {
          // let paramus = JSON.parse(response);
          let user = response[0];
          if (!user || user.username === 'null') {
            localStorage.removeItem('storesDataRef');
            localStorage.removeItem('storesData');
            localStorage.removeItem('storesDataCalendary');
            localStorage.removeItem('user');
            resolve([401, { message: 'Username or password is incorrect' }]);
          } else {
            let usuario = () => {
              var bytes = CryptoJS.AES.decrypt(user.password, 'key instrumentacion 123');
              var password = bytes.toString(CryptoJS.enc.Utf8);
              return user.username === params.username && password === params.password;
            };
            if (usuario) {
              let usuario = {
                id: user?.id,
                username: user?.username,
                nombres: user?.nombres,
                apellidos: user?.apellidos,
                role: user?.role,
                token: user?.token,
                clave: user?.Nombre,
                status: user?.Apellido,
              };
              localStorage.removeItem('user');
              setItemStorage({
                data: usuario,
                item: 'user',
                typeOfStorage: localStorage,
              });
              localStorage.removeItem('storesDataRef');
              localStorage.removeItem('storesData');
              localStorage.removeItem('storesDataCalendary');
              resolve([200, usuario]);
            } else {
              localStorage.removeItem('storesDataRef');
              localStorage.removeItem('storesData');
              localStorage.removeItem('storesDataCalendary');
              localStorage.removeItem('user');
              resolve([401, { message: 'Username or password is incorrect' }]);
            }
          }
        });
      }, 1000);
    });
  });
  mock.onPost('/register/').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // get parameters from post request
        let CryptoJS = require('crypto-js');
        let params = JSON.parse(config.data);
        const url = `https://autoevaluacion.com.co/v1/?&accion=usuarios&opcion=registrar`;
        const Usuarios = api.setConsultas(`${url}?numero_documento=${params.username}`);
        Usuarios.then(function (response) {
          let paramus = JSON.parse(response);
          let user = paramus.Data[0];
          if (!user) {
            // else return error
            resolve([401, { message: 'Username or password is incorrect' }]);
          } else {
            const arr = JSON.stringify(user);
            const users = JSON.parse(arr);
            let usuario = () => {
              var password = CryptoJS.AES.encrypt(params.password, 'secret key 123').toString();
              return users.username === params.username && password === params.password;
            };
            if (usuario) {
              // if login details are valid return user details and fake jwt
              const TOKEN = '';
              let newUser = {
                id: users.length + 1,
                id_pernatural: params.id_pernatural,
                id_persona: params.id_persona,
                primer_nombre: params.primer_nombre,
                segundo_nombre: params.segundo_nombre,
                numero_documento: params.numero_documento,
                Nombre: params.Nombre,
                Apellido: params.Apellido,
                email_personal: params.email_personal,
                email_institucional: params.email_institucional,
                username: params.username,
                password: params.password,
                role: params.role,
                token: TOKEN,
              };
              users.push({ newUser });

              resolve([200, newUser]);
            } else {
              resolve([401, { message: 'Username or password is incorrect' }]);
            }
          }
        });

        // add new users
        //let [firstName, lastName] = params.fullname.split(' ');
      }, 1000);
    });
  });

  mock.onPost('/forget-password/').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        /*
        const [usuarios, setUsuarios] = useState([]);
        // get parameters from post request
        let params = JSON.parse(config.data);
        // find if any user matches login credentials
        let filteredUsers = usuarios.filter((user) => {
            return user.username === params.username;
        });

        if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            let responseJson = {
                message: "We've sent you a link to reset password to your registered email.",
            };
            resolve([200, responseJson]);
        } else {
            // else return error
            resolve([401, { message: 'Sorry, we could not find any registered user with entered username' }]);
        }
        */
      }, 1000);
    });
  });
}
