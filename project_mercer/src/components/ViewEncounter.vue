<template>
    <div>
        <!--Info on this encounter-->
        <h4>Name: {{deliveredEncounter.name}}</h4><br>
        <h4>Description:</h4><br>
        <textarea v-model="deliveredEncounter.definition" disabled></textarea><br>
        <h4>Challenge Rating: {{deliveredEncounter.cr}}</h4><br>
        <button v-on:click.prevent="close">Close</button>
    </div>
</template>

<script>
    export default {
        name: "ViewEncounter",
        props:{
            deliveredEncounter: Object
        },
        methods:{
            //Close the encounter
            close(){
                this.$emit('closeView')
            }
        }
    }
</script>

<style scoped>

</style>