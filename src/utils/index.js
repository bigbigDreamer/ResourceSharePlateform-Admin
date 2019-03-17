export default {
    savaData(todo = false){
        return window.sessionStorage.setItem('state',todo);
    },
    getData(){
       return  window.sessionStorage.getItem('state');
    }
};