var express=require('express')

module.exports=function (Encounter) {
    var router=express.Router()

    router.get('/encounters', function(req, res, next){
        Encounter.findAll().then(encounters=>{
            return res.json(encounters)
        })
    })

    router.post('./encounters', function (req, res, next) {
        Encounter.create(req.body).then((data)=>{
            return res.status(201).send('ok')
        })
    })

    return router
}