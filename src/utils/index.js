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
    saveName(todo){
        return Window.sessionStorage.setItem('name',todo);
    },
    getUserName(){
        return Window.sessionStorage.getItem('name');
    }
};