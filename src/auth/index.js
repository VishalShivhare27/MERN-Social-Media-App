export const signup = user => {
    
    return fetch("http://localhost:5001/signup", {
     method:"POST",
     headers: {
       Accept : "application/json",
       "Content-Type": "application/json"
     },
     body: JSON.stringify(user)
   })
   .then(response => {
     return response.json()
   })
   .catch(err => console.log(err))
  }

  export const signin = user => {
    return fetch("http://localhost:5001/signin", {
     method:"POST",
     headers: {
       Accept : "application/json",
       "Content-Type": "application/json"
     },
     body: JSON.stringify(user)
   })
   .then(response => {
     return response.json()
   })
   .catch(err => console.log(err))
  }

  export const authenticate = (jwt,next) => {
    //save jwt in browser's local storage
    if(typeof window !== "undefined"){
      localStorage.setItem("jwt" , JSON.stringify(jwt))
      //this next goes to redirect transfer to true
      next()
    }
  } 

  export const signout = (next) => {
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    next();

    return fetch("http://localhost:5001/signout", {
        method: "GET"
    })
    .then(response => {
        console.log('signout',response)
        return response.json()
    })
    .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}