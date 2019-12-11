module.exports=(sequelize, DataTypes) => {
    var Encounter=sequelize.define('Encounter',{
        name:{
            type: DataTypes.STRING,
        }, definition:{
            type: DataTypes.STRING,
        }, cr:{
            type: DataTypes.DOUBLE,
        }
    })

    Encounter.sync({force: true}).then( ()=>{
        console.log('synced table')
    })

    return Encounter
}