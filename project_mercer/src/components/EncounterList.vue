<template>
    <div class="encounterSummary">
        <!--Info on this encounter-->
        <span>{{usedEncounter.name}}</span><br>
        <span>CR: {{usedEncounter.cr}}</span><br>

        <!--Buttons-->
        <button v-on:click.prevent="editNow">Edit</button>
        <button v-on:click.prevent="viewNow">View</button>
        <button v-on:click.prevent="removeNow">Delete</button>
    </div>
</template>

<script>
    export default {
        name: "EncounterList",
        data(){
            return{
                usedEncounter:this.deliveredEncounter
            }
        },
        props:{
            deliveredEncounter: Object
        },
        methods:{
            //Edit this encounter
            editNow(){
                this.$emit('editPlease', this.usedEncounter)
            },
            //View this encounter
            viewNow(){
                this.$emit('viewPlease', this.usedEncounter)
            },
            //Delete this encounter
            removeNow(){
                this.$emit('delet_dis', this.usedEncounter)
            }
        }
    }
</script>

<style scoped>
    .encounterSummary{
        height: 8em;
        width: 16em;
        border: 3px white solid;
        background-color: blue;
    }
    span{
        font-family: VCR;
        color: white;
    }
    button{
        font-family: VCR;
        color: white;
        background-color: blue;
        border: 3px white solid;
    }
</style>