
 function checkAuthenticated(token) { 
    fetch('http://localhost:5000/api/v1/users/verify', {
      method: 'GET',
      headers:{
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then(data => data) 
    .catch(e => {
        console.log(e)
    })   
    
}

module.exports = { checkAuthenticated }