import Api from '@/services/Api'
export default{
    index(){
        return Api().get('pets')
    },
    add(data){

        return Api().post('pets',data)
    },
    viewpet(petid){
        return Api().get(`pet/${petid}`)
    }

    
}