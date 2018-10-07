const express = require('express');
const apiWeb = express.Router();
const axios = require('axios')
apiWeb.get('/web15',(req,res)=>{
 
    const url = 'https://btvn-web15s.herokuapp.com/api/web15'

    axios.get(url).then((respones) =>{
        console.log(respones.data)
      res.send(respones.data)
    })

})
apiWeb.get('/web14',(req,res)=>{
 
    const url = 'https://btvn-web15s.herokuapp.com/api/web14'

    axios.get(url).then((respones) =>{
        console.log(respones.data)
      res.send(respones.data)
    })

})
apiWeb.get('/web13',(req,res)=>{
 
    const url = 'https://btvn-web15s.herokuapp.com/api/web13'

    axios.get(url).then((respones) =>{
        console.log(respones.data)
      res.send(respones.data)
    })

})
apiWeb.get('/web12',(req,res)=>{
 
    const url = 'https://btvn-web15s.herokuapp.com/api/web12'

    axios.get(url).then((respones) =>{
        console.log(respones.data)
      res.send(respones.data)
    })

})
apiWeb.get('/web11',(req,res)=>{
 
    const url = 'https://btvn-web15s.herokuapp.com/api/web11'

    axios.get(url).then((respones) =>{
        console.log(respones.data)
      res.send(respones.data)
    })

})
apiWeb.get('/web10',(req,res)=>{
 
    const url = 'https://btvn-web15s.herokuapp.com/api/web10'

    axios.get(url).then((respones) =>{
        console.log(respones.data)
      res.send(respones.data)
    })

})

module.exports = apiWeb;