<template>
    <div>
        <div id="errorBanner">
            {{errors}}
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
                encounterName:'',
                encounterDescription:'',
                encounterCR:0,

                //Encounter template
                returnEncounter:{
                    name:'',
                    description:'',
                    cr:0
                },

                //List of errors
                errors:[]
            }
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
                    this.returnEncounter.name=this.encounterName
                    this.returnEncounter.description=this.encounterDescription
                    this.returnEncounter.cr=this.encounterCR
                    this.$emit('returnedEncounter',this.returnEncounter)
                }
            },
            cancel(){
                //Leave without saving TODO maybe put in a confirmation?
                this.$emit('cancel')
            }
        }
    }
</script>

<style scoped>

</style>