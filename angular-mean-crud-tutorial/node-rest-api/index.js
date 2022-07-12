const express =  require('express');
const app= express();
app.use(express.json);
const courses=[
    {id:"1", name:"english"},
    {id:"2", name:"bangla"},
    {id:"3",name:"math"}
]
app.get('/', (req, res)=>{
    res.send('Hello World');
});
app.get('/api/courses', (req,res)=>{
    res.send([1,2,3,4]);
})
app.get('/api/courses/:id',(req,res)=>{
    const d=courses.find((c)=>c.id==parseInt(req.params.id));
    if(!d)res.status(404).send("Course with this id not found");
    res.send(d);
})
app.post('/api/courses',(req,res)=>{
    const temp=
        {id:courses.length+1, name: req.body.name};
    courses.push(temp);
    res.send(temp);
    
})
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port} ...`));
