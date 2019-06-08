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
        return window.sessionStorage.setItem('names',todo);
    },
    getUserName(){
        return window.sessionStorage.getItem('names');
    },
    saveRoutes(routes){
        return window.sessionStorage.setItem('routes',routes);
    },
    getRoutes(routes) {
        return window.sessionStorage.getItem('routes');
    }
};