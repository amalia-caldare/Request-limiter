# Request-limiter

### Description of the solution
The solution consists in a simple API created using express, which performs three different GET requests. Two of the paths being limited by the requestLimiter function. 
The requestLimiter function takes as parameters three numbers:
  - limit: represents the number of requests that the user is allowed to perform
  - time: represents the interval of time in which the user can do those requests
  - restart: represents the interval after which the user can perfom requests again.

The function starts by creating an empty array which will store the time of the requests made by the user. Afterwards a middleware funtion named "check" is defined, where it will be checked either if the user made more than the limit of requests specified at the beginning in the specific interval of time. So, it first takes the time in which the request has been made, stores it in the array and then it calculates to see when it is supposed to stop. The array will be filtered afterwards, so it keeps only the requests made until the calculated stop moment. If the array length is bigger than the limit set by the user, then the page will be blocked for some seconds, sending a message to the user(also in the console). 
The user can try and make other requests after the restart time passes. In case the length of the array is not overcoming the limit set, then the program goes to the next steps. 

As there are two routes which have limitations, I have declared to variables that call the requestLimiter function, but with different specifications( limiter1 and limiter2) and I applied them to the specific routes in the app.get() methods.

### Steps to test the solution

1. npm install - to install packages
2. node app.js
3. http://localhost:3000/

!Note: The root path has no limiter. Only the http://localhost:3000/first and http://localhost:3000/second have different limitations. You can modifiy the numbers of the limitations as desired
