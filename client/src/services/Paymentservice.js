import Api from '@/services/Api'
export default {
    success(data){
        return Api().post('pay',data)
    }
    
    
}