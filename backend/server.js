const express = require('express')
const app = express();
const path = require('path')


app.use('/',express.static(path.join(__dirname,'/build')))



app.get('/',(req,res)=>{
    res.sendFile('/index.html')
})



app.listen(3005,()=>{
    console.log('서버오픈')
})