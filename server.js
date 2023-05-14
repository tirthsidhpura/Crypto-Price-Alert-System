const express = require('express');
const { fork } = require('child_process');

const app = express();


app.use(express.urlencoded({extended:true}));

app.post('/createalert',async(req,res) => {
    try {
        const { userId, thresholdPrice } = req.body;
        const child = fork('./alert_decider.js', [userId, thresholdPrice]);
        // console.log({child})
        res.status(200).json({msg:'we haved added your alert to watchlist'})

    } catch (error) {
        
    }
})


app.listen('3000',() => {console.log('server is started')})