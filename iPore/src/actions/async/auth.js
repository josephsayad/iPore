import axios from 'axios';

export default {
  signInWithEmailAndPassword: (email, password) => {
    return new Promise((resolve, reject) => {
      axios.post('http://192.168.150.1:3000/account/login', {
          password,
          email
        })
        .then(response => {
          const { status } = response.data;

          if (status === 'success') {
            // console.log('Successful login...');
            resolve(response.data);
          } else if (status === 'fail') {
            // console.log('Invalid email or password...');
            reject(response);
          }
        }) 
        .catch(error => {
          // console.log('Connection error...');
          reject(error);
        });
    });
  },

  createUserWithEmailAndPassword: (email, password) => {
    return new Promise((resolve, reject) => {
      if (email !== '' && password !== '') {
        axios.get('http://192.168.150.1:3000/api/user/email/' + email, {
            password,
            email
          })
          .then(response => {
            const { status } = response.data;

            if (status === 'success') {
              reject('User Account Taken.');
            } else if (status === 'fail') {
              axios.post('http://192.168.150.1:3000/api/user/', {
                  password,
                  email
                })
                .then(user => {
                  resolve(user.data.result);
                })
                .catch(() => {
                  reject('Connection error.');
                });
            }
          }) 
          .catch(() => {
            reject('Connection error.');
          });
      } else {
        reject('Email & Password Required.'); 
      }
    });
  }
};
