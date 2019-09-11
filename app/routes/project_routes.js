let ObjectId = require('mongodb').ObjectID

module.exports = function (app, db){

    //
    app.get('/project/:id', (req, res) =>{
        const id = req.params.id
        const details = {'_id': new ObjectId(id)};
        db.collection('ProjectCollec').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured'});
            } else {
                res.send(item)
            }  
        })
    })

    app.delete('/project/:id', (req, res) =>{
        const id = req.params.id
        const details = {'_id': new ObjectId(id)};
        db.collection('ProjectCollec').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured'});
            } else {
                res.send('This' + id + ' is deleted')
            }  
        })
    })

    app.put('/project/:id', (req, res) =>{
        const id = req.params.id
        const details = {'_id': new ObjectId(id)};
        const project = {title: req.body.title, content: req.body.content, folder: req.body.folder, employee: req.body.employee}
        db.collection('ProjectCollec').update(details, project, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured'});
            } else {
                res.send(item)
            }  
        })
    })

    app.post('/project', (req, res) => {
        const project = {title: req.body.title, content: req.body.content, folder: req.body.folder, employee: req.body.employee}
        db.collection('ProjectCollec').insertOne(project, (err,result) =>{
if (err) {
    res.send({ 'error': 'An error has occured'});
} else {
    res.send(result.ops[0])
}
        })
    })
}