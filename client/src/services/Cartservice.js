import Api from '@/services/Api'
export default {
    adding(data){
      return Api().post('cart',data)
    },
    getting(data){
        return Api().get('cart',{params:{userId:data}})
    },
    remove(data){
        return Api().delete(`cart/${data}`)
    },
    delall(id){
  return Api().delete(`user/${id}`)
    }
}