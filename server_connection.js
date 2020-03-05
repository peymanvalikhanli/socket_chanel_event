import {AsyncStorage} from 'react-native';

const URLs = {
  Root: 'http://164.138.18.90:8080/mbiz/task_api/public/api/',
  user: 'user',
  login: 'Login',
  register: 'Register',
  recovery: 'RecoveryPass', 
  contact: 'Contact',
};

export default class server_connection {
  static user_token = null;
  static async register(name, email, pass) {
    const formData = new FormData();
    formData.append('UserName', 'peyman');
    formData.append('Password', '12334567');
    formData.append('OfficePosition', '0');
    formData.append('email', 'sada@dasd.com');
    return await fetch(URLs.Root + URLs.register, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': 'NEBKA',
      }),
      body: JSON.stringify({
        UserName: email,
        name: name,
        Password: pass,
        email: email,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Register user', responseJson.data);
        if (responseJson.data.token) {
          AsyncStorage.setItem('Token', responseJson.data.token);
          this.user_token = responseJson.data.token;
          AsyncStorage.setItem('Name', responseJson.data.name);
          AsyncStorage.setItem('Email', responseJson.data.email);
        }
        return responseJson.data;
      })
      .catch(error => {
        console.error('NABKE fetch Register user', error);
        return error;
      });
  }
  static async login(email, pass) {
    return await fetch(URLs.Root + URLs.login, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': 'NEBKA',
      }),
      body: JSON.stringify({
        Password: pass,
        email: email,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Login user', responseJson);
        if (responseJson.data.token) {
          AsyncStorage.setItem('Token', responseJson.data.token);
          this.user_token = responseJson.data.token;
          AsyncStorage.setItem('Name', responseJson.data.name);
          AsyncStorage.setItem('Email', responseJson.data.email);
        }
        return responseJson.data;
      })
      .catch(error => {
        console.error('NABKE fetch Login user', error);
        return error;
      });
  }

  static async check_login() {
    return AsyncStorage.getItem('Token', (err, result) => {
      if (result != null) {
        this.user_token = result;
        console.log('NEBKA check login :', result);
        return true;
      } else {
        console.log('NEBKA check login :', err);
        return false;
      }
    });
  }

  static async logout() {
    try {
      AsyncStorage.setItem('Token', null);
      AsyncStorage.setItem('Name', null);
      AsyncStorage.setItem('Email', null);
      AsyncStorage.clear();
      return true;
    } catch (e) {
      return e;
    }
  }

  static async recovery_pass() {
    return await fetch(URLs.Root + URLs.recovery, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN':this.user_token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch recovery', responseJson);
        return responseJson.data;
      })
      .catch(error => {
        console.error('NABKE fetch recovery', error);
        return error;
      });
  }
  static async contact_list() {
    return await fetch(URLs.Root + URLs.contact, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN':this.user_token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Contact List', responseJson);
        return responseJson.data;
      })
      .catch(error => {
        console.error('NABKE fetch Contact List', error);
        return error;
      });
  }
}
