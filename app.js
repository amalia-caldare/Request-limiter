/** Express */ 
const express = require('express');
const app = express();

app.use(express.json());

/** Implementation of Request Limiter function */ 

 const requestLimiter = function(limit, time, restart) {
        let requests = [];
        const check = function (req, res, next) {
            const now = new Date;
            const stop = new Date(now.getTime() - time)
        
            requests.push(now);
            requests.filter(request => request > stop)

            if(requests.length > limit){
                res.send({response: 'Blocked by the requests limiter. Try again in a few seconds!'});
                console.log('Blocked by the requests limiter. Try again in a few seconds!');
                setTimeout(function() {
                   requests = [];
                }, restart);
            } else {
                next();
            }
        }
        return check;
    }

/** Declaration of two different limiters */

const limiter1 = requestLimiter(3, 5000, 4000);
const limiter2 = requestLimiter(2, 2000, 2000);

/** Routes section */

// Not limited route
app.get('/', (req,res) => {
    res.send({response: "The root is not limited."});
})

// The limited routes

app.get('/first', limiter1, (req, res) => {
    res.send({response: "You've accessed the first limited path."});
})

app.get('/second', limiter2, (req, res) => {
    res.send({response: "You've accessed the second limited path."});
})

/** Start the server */

app.listen(3000, (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Server listening on port 3000");
    }
});