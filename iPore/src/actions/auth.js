import axios from 'axios';

export default {
  signInWithEmailAndPassword: (email, password) => {
    return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/account/login', {
        password,
        email
      })
      .then(response => {
        const { status } = response.data;

        if (status === 'success') {
          console.log('Successful login...');
          resolve(response.data);
        } else if (status === 'fail') {
          reject(response);
        }
      }) 
      .catch(error => {
        reject(error);
      });
    });
  },

  createUserWithEmailAndPassword: (email, password, errorMessage) => {
    const { message } = errorMessage.data;
    
    return new Promise((resolve, reject) => {
      if (email !== '' && password !== '') {
        if (message === 'Invalid Email') {
          console.log('Invalid email. Creating new account...');

          axios.post('http://localhost:3000/api/user', {
              password,
              email
            })
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
          } else if (message === 'Invalid Password') {
            console.log('Invalid Password. Authentication failed...');
            reject();
          }
        } else {
          console.log('Email and password must be provided...');
          reject();
        }
    });
  }
};
