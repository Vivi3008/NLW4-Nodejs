import express from 'express'

const app = express()

app.get('/', (req,res)=>{
    res.json({Hello: "NLW!"})
})

app.post('/create', (req,res)=>{
   

    return res.json({Nome: "Viviane Ramos", Email: "ramosluzviviane@gmail.com"})
})

app.listen('3333', ()=> console.log("Server is runnin on port 3333"))