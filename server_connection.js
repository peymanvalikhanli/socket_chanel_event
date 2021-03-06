import {AsyncStorage} from 'react-native';

import PushNotification from 'react-native-push-notification';

const URLs = {
  Root: 'http://164.138.18.90:8080/mbiz/task_api/public/api/',
  socket: 'http://164.138.18.90:6001',
  user: 'user',
  login: 'Login',
  register: 'Register',
  recovery: 'RecoveryPass',
  ChangePass: 'ChangePass',
  contact: 'Contact',
  ChatHistory: 'ChatHistory',
  CreateGroup: 'CreateGroup',
  GroupHistory: 'GroupHistory',
  SendMessage: 'SendMessage',
  SendMessageGroup: 'SendMessageGroup',
  DeleteMessage: 'DeleteMessage',
  DeleteMessageGroup: 'DeleteMessageGroup',
  Chatlist: 'ChatList',
  GroupList: 'GroupList',
  SendFileChat: 'SendFileChat',

  CreateTask: 'CreatTask',
  SelectTaskMembers: 'SelectTaskMembers',
  SelectTaskLable: 'SelectTaskLable',
  ChangeTaskDescription: 'ChangeTaskDescription',
  SelectTaskDueDate: 'SelectTaskDueDate',
  ChangeTaskCheckList: 'ChangeTaskCheckList',
  AddTaskAttachment: 'AddTaskAttachment',
  SendTaskComment: 'SendTaskComment',
  TaskList: 'TaskList',
  TaskProfile: 'TaskProfile',
  TaskMembers: 'TaskMembers',
  TaskLabel: 'TaskLabel',
};

export default class server_connection {
  static chat_By = null;
  static last_message_id = null;
  static chat_data = [];
  static user_token = null;
  static active_calass = null;
  static async register(name, email, pass, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.register, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
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
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Register user', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }
  static async login(email, pass, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.login, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
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
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Login user', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async check_login(this_class = null, func = null) {
    return AsyncStorage.getItem('Token', (err, result) => {
      if (result != null) {
        this.user_token = result;
        console.log('NEBKA check login :', result);
        if (func != null) {
          setTimeout(() => {
            func(this_class, true);
          }, 1000);
          return true;
        } else if (this_class != null) {
          this_class.setState({
            n: this_class.props.navigation.navigate('ChatlistIndex'),
          });
          PushNotification.configure({
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log('LOCAL NOTIFICATION ==>', notification);
            },
            popInitialNotification: true,
            requestPermissions: true,
          });
        }
        return true;
      } else {
        console.log('NEBKA check login :', err);
        if (func != null) {
          func(this_class, false);
        } else if (this_class != null) {
          this_class.setState({
            n: this_class.props.navigation.navigate('SignIn'),
          });
        }
        return false;
      }
    });
  }

  static async logout(this_class = null) {
    try {
      AsyncStorage.setItem('Token', null);
      AsyncStorage.setItem('Name', null);
      AsyncStorage.setItem('Email', null);
      AsyncStorage.clear();
      if (this_class != null) {
        this_class.setState({
          n: this_class.props.navigation.navigate('SignIn'),
        });
      }
      return true;
    } catch (e) {
      return e;
    }
  }

  static async recovery_pass(email, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.recovery, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
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
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch recovery', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }
  static async change_pass(email, pass, code, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.ChangePass, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': 'NEBKA',
      }),
      body: JSON.stringify({
        email: email,
        code: code,
        Password: pass,
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
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch change password', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }
  static async ChatHistory(id, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.ChatHistory, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
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
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Chat History', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async GroupHistory(id, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.GroupHistory, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
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
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Chat History', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async contact_list(func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.contact, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Contact List', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Contact List', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async create_group(name, users, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.CreateGroup, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
      body: JSON.stringify({
        Name: name,
        Users: users,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Contact List', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Contact List', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async send_message(
    id,
    message,
    title,
    func = null,
    this_class = null,
  ) {
    return await fetch(URLs.Root + URLs.SendMessage, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
      body: JSON.stringify({
        id: id,
        message: message,
        title: title,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Send Message', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Send Message', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async send_message_group(
    id,
    message,
    title,
    func = null,
    this_class = null,
  ) {
    return await fetch(URLs.Root + URLs.SendMessageGroup, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
      body: JSON.stringify({
        id: id,
        message: message,
        title: title,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Send Message', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Send Message', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async delete_message(id, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.DeleteMessage, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Delete Message', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Delete Message', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async delete_message_group(id, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.DeleteMessageGroup, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Delete Message Group', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Delete Message Group', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async Chat_list(func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.Chatlist, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Chat list', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Chat list', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async group_list(func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.GroupList, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Group list', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        //console.error('NABKE fetch Group list', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }

  static async send_file_chat(func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.GroupList, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Group list', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Group list', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }
  static async create_task(name, func = null, this_class = null) {
    return await fetch(URLs.Root + URLs.CreateTask, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': this.user_token,
      }),
      body: JSON.stringify({
        Name: name,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('NABKE fetch Contact List', responseJson);
        if (func != null) {
          func(responseJson, this_class);
        }
        return responseJson;
      })
      .catch(error => {
        console.error('NABKE fetch Contact List', error);
        if (func != null) {
          func(error, this_class);
        }
        return error;
      });
  }
}