<template>
  <div id="app">
    <p>Welcome to Project Mercer</p>
    <EditEncounter v-if="edit" v-bind:deliveredEncounter="deliveredEncounter" :key="change" v-on:returnedEncounter="decide" v-on:cancel="editOff"></EditEncounter>
    <ViewEncounter v-if="view" v-bind:deliveredEncounter="deliveredEncounter" :key="change"></ViewEncounter>
    <button v-if="!edit" v-on:click.prevent="newEncounter">New Encounter</button>
    <h2>Encounters:</h2>
    <EncounterList v-bind:encounters="encounters" :key="change"></EncounterList>
  </div>
</template>

<script>

  /*TODO:
  -Get the vue client and the server talking to each other
  -Show the encounters with buttons to view, edit, and delete them
  -Not just a ul, but actual discernable boxes (I think I'm going to need to add bootstrap to do that)
  -Get view window working
  -Replace placeholder error message with real shit
  -Figure out how to discern the indexes of encounters, plug that number into editIndex
  -Purge the databanks of all the garbage test encounters I made
  -Make everything look purty
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

      //What is the index of the edited encounter
      editIndex:-1,

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
      this.$encounter_api.getAllEncounters().then(encounters=>{
        encounters[this.editIndex]=encounter
        this.updateEncounters()
      })
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
        description:'',
        cr:0
      }
      this.deliveredEncounter={
        name: '',
        description:'',
        cr:0
      }

      this.edit=false
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
