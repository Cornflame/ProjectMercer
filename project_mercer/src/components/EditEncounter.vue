<template>
    <div>
        <div id="errorBanner">
            <li v-for="error in errors">{{error}}</li>
        </div>
        <div>
            <form>
                <!--Encounter Name-->
                <label for="name">Encounter Name:</label><br>
                <input v-model="encounterName" id="name">
                <br><br>
                <!--Encounter Description-->
                <label for="description">Encounter Description:</label><br>
                <textarea v-model="encounterDescription" id="description" rows="15" cols="70"></textarea>
                <br><br>
                <!--Challenge Rating-->
                <label for="cr">Challenge Rating:</label><br>
                <input v-model="encounterCR" id="cr" type="number">
                <br><br>
                <!--Submit Button-->
                <button v-on:click.prevent="submit">Submit</button>
                <button v-on:click.prevent="cancel">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditEncounter",
        data(){
            return{
                //Elements of Encounter object
                encounterName:this.deliveredEncounter.name,
                encounterDescription:this.deliveredEncounter.definition,
                encounterCR:this.deliveredEncounter.cr,

                //List of errors
                errors:[]
            }
        },
        props:{
            deliveredEncounter: Object
        },
        methods:{
            submit(){
                //Look for errors
                this.errors=[]

                if(this.encounterName==''){
                    this.errors.push('Please give this encounter a name')
                }
                if(this.encounterDescription==''){
                    this.errors.push('Please give this encounter a description')
                }
                if(this.encounterCR<=0){
                    this.errors.push('Please give this encounter a challenge rating higher than 0')
                }

                //Send to app.vue if there aren't errors
                if(this.errors.length>0){
                    //Error Message
                }else{
                    this.deliveredEncounter.name=this.encounterName
                    this.deliveredEncounter.definition=this.encounterDescription
                    this.deliveredEncounter.cr=this.encounterCR
                    this.$emit('returnedEncounter',this.deliveredEncounter)
                }
            },
            cancel(){
                this.$emit('cancel')
            }
        }
    }
</script>

<style scoped>

</style>