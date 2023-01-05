import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setItemStorage } from '../pages/dashboard/components/itemStorage';

const TOKEN =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI';

var mock = new MockAdapter(axios);

export function configureFakeBackend() {
    let users = [
        {
            id: 1,
            username: 'Admin',
            name: 'Aministrador',
            phone: '(809) 2120936',
            email: 'dtindley4@so-net.ne.jp',
            status: 'Blocked',
            password: 'admin2023',
            firstName: 'Administrador',
            lastName: 'Admin',
            role: 'Admin',
            token: TOKEN,
        },
        {
          id: 2,
          username: 'Docente',
          name: 'Docente',
          phone: '(809) 2120936',
          email: 'dtindley4@so-net.ne.jp',
          status: 'Blocked',
          location: 'Colombia',
          password: 'docente2023',
          firstName: 'Docente',
          lastName: 'Docente',
          role: 'Docente',
          token: TOKEN,
      }
    ];
    mock.onPost('/login/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // find if any user matches login credentials
                let filteredUsers = users.filter((user) => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return user details and fake jwt token
                    let user = filteredUsers[0];
                    setItemStorage({
                      data: user,
                      item: 'user',
                      typeOfStorage: localStorage,
                  });
                    resolve([200, user]);

                } else {
                    // else return error
                    resolve([401, { message: 'Username or password is incorrect' }]);
                }
            }, 1000);
        });
    });

    mock.onPost('/register/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // add new users
                let [firstName, lastName] = params.fullname.split(' ');
                let newUser = {
                    id: users.length + 1,
                    username: firstName,
                    password: params.password,
                    firstName: firstName,
                    lastName: lastName,
                    role: 'Admin',
                    token: TOKEN,
                };
                users.push({ newUser });

                resolve([200, newUser]);
            }, 1000);
        });
    });

    mock.onPost('/forget-password/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // find if any user matches login credentials
                let filteredUsers = users.filter((user) => {
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
            }, 1000);
        });
    });
}
