import Api from '@/services/Api'
export default {
    register(data){
        return Api().post('user',data)
    },
    login(data){
        return Api().post('login',data)
    }
}