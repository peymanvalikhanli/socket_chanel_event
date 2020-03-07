import {AsyncStorage} from 'react-native';

const URLs = {
  Root: 'http://164.138.18.90:8080/mbiz/task_api/public/api/',
  user: 'user',
  login: 'Login',
  register: 'Register',
  recovery: 'RecoveryPass', 
  ChangePass: 'ChangePass',
  contact: 'Contact',
  ChatHistory:'ChatHistory',
  CreateGroup:'CreateGroup',
};

export default class server_connection {
  static user_token = null;
  static async register(name, email, pass , func=null) {
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
        if(func!= null){
          func(responseJson); 
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Register user', error);
        if(func!= null){
          func(error); 
        }
        return error;
      });
  }
  static async login(email, pass , func=null) {
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
        if(func!= null){
          func(responseJson); 
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Login user', error);
        if(func!= null){
          func(error); 
        }
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

  static async recovery_pass(email, func=null) {
    return await fetch(URLs.Root + URLs.recovery, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': 'NEBKA',
      }),
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch recovery', responseJson);
        if(func!= null){
          func(responseJson); 
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch recovery', error);
        if(func!= null){
          func(error); 
        }
        return error;
      });
  }
  static async change_pass(email,pass,code , func = null) {
    return await fetch(URLs.Root + URLs.ChangePass, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': 'NEBKA',
      }),
      body: JSON.stringify({
        email: email,
        code: code, 
        Password: pass
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch change password', responseJson);
        if (responseJson.data.token) {
          AsyncStorage.setItem('Token', responseJson.data.token);
          this.user_token = responseJson.data.token;
          AsyncStorage.setItem('Name', responseJson.data.name);
          AsyncStorage.setItem('Email', responseJson.data.email);
        }
        if(func!= null){
          func(responseJson); 
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch change password', error);
        if(func!= null){
          func(error); 
        }
        return error;
      });
  }
   static async ChatHistory(id, func = null) {
    return await fetch(URLs.Root + URLs.ChatHistory, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Chat History', responseJson);
        if(func!= null){
          func(responseJson); 
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Chat History', error);
        if(func!= null){
          func(error); 
        }
        return error;
      });
  }
  static async contact_list(func = null) {
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
        if(func!= null){
          func(responseJson); 
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Contact List', error);
        if(func!= null){
          func(error); 
        }
        return error;
      });
  }
  static async create_group(name, users , func=null) {
    return await fetch(URLs.Root + URLs.CreateGroup, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN':this.user_token,
      }),
      body: JSON.stringify({
        Name: name,
        Users: users, 
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Contact List', responseJson);
        if(func!= null){
          func(responseJson); 
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Contact List', error);
        if(func!= null){
          func(error); 
        }
        return error;
      });
  }
}
