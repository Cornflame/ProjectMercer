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
    }
}