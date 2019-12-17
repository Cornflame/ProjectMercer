<template>
  <div id="app">
    <p>Welcome to Project Mercer</p>
    <EditEncounter v-if="edit" v-bind:deliveredEncounter="deliveredEncounter" :key="change" v-on:returnedEncounter="decide" v-on:cancel="editOff"></EditEncounter>
    <ViewEncounter v-if="view" v-bind:deliveredEncounter="deliveredEncounter" :key="change" v-on:closeView="closeView"></ViewEncounter>
    <br><button v-if="!edit" v-on:click.prevent="newEncounter">New Encounter</button><br>
    <h2>Encounters:</h2>
    <EncounterList v-for="deliveredEncounter in encounters"  v-on:editPlease="beginEdit" v-on:viewPlease="viewBoy" v-on:delet_dis="deleteEncounter" v-bind:deliveredEncounter="deliveredEncounter" :key="change"></EncounterList>
  </div>
</template>

<script>

  /*TODO:
  -Make everything look purty
  -Comments
  -github
  -heroku
   */

  import EncounterList from "./components/EncounterList";
  import EditEncounter from "./components/EditEncounter";
  import ViewEncounter from "./components/ViewEncounter";

export default {
  name: 'app',
  data(){
    return{

      //Counter updates components
      change:0,

      //Array of encounter objects pulled from database
      encounters:[],

      //Blank slate encounter object
      encounter:{
        name: '',
        description:'',
        cr:0
      },

      //Is editing occuring
      edit:false,

      //Is this encounter brand new
      newEdit:false,

      //Blank slate encounter to be overridden with whatever is being edited
      deliveredEncounter:{
        name: '',
        description:'',
        cr:0
      },

      //Are we looking at an encounter?
      view:false

    }
  },
  components:{
    EncounterList,
    EditEncounter,
    ViewEncounter
  },
  mounted() {
    this.updateEncounters()
  },
  methods:{
    //Starts a new encounter
    newEncounter(){
      this.deliveredEncounter=this.encounter
      this.view=false
      this.newEdit=true
      this.edit=true
    },

    //Adds new encounter and sending it to the api
    addEncounter(encounter){
      this.edit=false
      this.$encounter_api.addEncounter(encounter).then(() =>{
        this.updateEncounters()
      })
    },

    //Edits existing encounter
    editEncounter(encounter){
      this.edit=false
      this.$encounter_api.updateEncounter(encounter)
      this.updateEncounters()
    },

    //Updates encounters by pulling them from API and placing them in the encounters array
    updateEncounters(){
      this.$encounter_api.getAllEncounters().then(encounters=>{
        this.encounters=encounters
      })
      this.change++
    },

    //Decides if returned encounter is replacing an existing one or if it's new
    decide(encounter){
      if(this.newEdit){
        this.addEncounter(encounter)
      }else{
        this.editEncounter(encounter)
      }
    },

    //Turns edit off and cancels edit process
    editOff(){
      this.encounter={
        name: '',
        definition:'',
        cr:0
      }
      this.deliveredEncounter={
        name: '',
        definition:'',
        cr:0
      }

      this.edit=false
    },

    //Show the boy. SHOW HIM
    viewBoy(encounter){
      this.editOff()
      this.deliveredEncounter=encounter
      this.view=true
    },

    //Don't show the boy, HIDE HIM
    closeView(){
      this.view=false
    },

    //Open edit window and begin edit
    beginEdit(encounter){
      this.deliveredEncounter=encounter
      this.newEdit=false
      this.edit=true
    },

    //Get that thing outta here
    deleteEncounter(encounter){
      this.$encounter_api.deleteEncounter(encounter.id).then(()=>{
        this.updateEncounters()
      })
    }
  }
}
</script>

<style>
#app {
  font-family: VCR;
  text-align: center;
  color: white;
  margin-top: 60px;
  background-color: blue;
}
button{
  font-family: VCR;
  color: white;
  background-color: blue;
  border: 3px white solid;
}
</style>
