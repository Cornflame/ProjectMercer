import axios from 'axios'

const base_url='/api/encounters'
export default {
    getAllEncounters(){
        return axios.get(base_url).then(response =>{
            return response.data
        })
    },

    addEncounter(encounter){
        return axios.post(base_url, encounter).then(response=>{
            return response.data
        })
    },

    deleteEncounter(id){
        return axios.delete(`${base_url}/${id}`).then(response=>{
            return response.data
        })
    },

    updateEncounter(encounter){
        return axios.put(`${base_url}/${encounter.id}`, encounter).then(response=>{
            return response.data
        })
    }

}