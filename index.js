const PORT = process.env.PORT || 8003
const MILLI_SEC_PER_DAY = 24 * 60 * 60 * 1000;
const express = require('express');
const { WORDLE_ANS_LIST } = require('./WordBook');

const app = express();

const dateDiffInDays = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / MILLI_SEC_PER_DAY);
}

//Month is Zero-based
const initialDate = new Date(2021, 5, 19); 
const now = new Date();
const diff = dateDiffInDays(initialDate, now);

if(WORDLE_ANS_LIST.length == diff){
    initialDate = new Date();
}

//Finding today's answer
const answer = WORDLE_ANS_LIST.at(diff).toUpperCase();

//Routes
app.get('/answer', (req, res) => {
    res.send(`Today's Wordle Answer - <b>${answer}</b>!`)    
});

app.get('/firstletter', (req, res) => {
    res.send(`First letter of Today's Wordle Answer - ${answer.charAt(0)}`)
});

app.get('/lastletter', (req, res) => {
    res.send(`Last letter of Today's Wordle Answer - ${answer.charAt(answer.length-1)}`)
});

app.listen(PORT, () => console.log(
    `Server is running at PORT ${PORT}`
));