export default {
    saveData(todo = false) {
        return window.sessionStorage.setItem('state', todo);
    },
    getData() {
        return window.sessionStorage.getItem('state');
    },
    saveUser(info) {
        return window.sessionStorage.setItem('user', info);
    },
    getUser() {
        return window.sessionStorage.getItem('user');
    },
    setUserName(username){
        return Window.sessionStorage.setItem('username',username);
    },
    getUserName(){
        return Window.sessionStorage.getItem('username');
    }
};