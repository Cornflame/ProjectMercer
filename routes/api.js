var express=require('express')

module.exports=function (Encounter) {
    var router=express.Router()

    router.get('/encounters', function(req, res, next){
        Encounter.findAll().then(encounters=>{
            return res.json(encounters)
        })
    })

    router.post('/encounters', function (req, res, next) {
        Encounter.create(req.body).then((data)=>{
            return res.status(201).send('ok')
        })
    })

    router.delete('/encounters/:id', function (req, res, next) {
        Encounter.destroy({where:{id: req.params.id}}).then(()=>{
            return res.send('ok')
        }).catch(err=>next(err))
    })

    router.put('./encounters:id', function (req, res, next) {
        Encounter.update(
            {name: req.body.name},
            {definition: req.body.definition},
            {cr: req.body.cr},
            {where: req.params.id}
        )
            .then(function (rowsUpdated) {
                res.json(rowsUpdated)
            })
            .catch(next)
    })

    return router
}