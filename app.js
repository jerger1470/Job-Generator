const inquirer = require('inquirer');
// const fs = require("fs");
// const generateHTML = require("");



  
    function validateEmployee(employee){
        
        return employee !== yes;
    }

    function validateName(name){
          return name !== '';
    }

    function validateEmployeeId(value){
             
        var valid = !isNaN(parseFloat(value));
        return valid || "Please enter a valid ID number";
    }      

    function validateEmail(email){
        return email !== '';
    }
    
  
    inquirer.prompt([
  {
      message: "Are you an employee?",
      type: "confirm",
      name: "employee",
      validate: validateEmployee

  },{
      message: "What is your position?",
      type: "list",
      name: "position",
      choices:["Engineer", "`Manager", "Intern" ],
      filter: function( val ) { return val.toLowerCase(); }
      
  },{
    message: "What's your name?",
    type: "input",
    name: "fullName",
    validate: validateName
  },{
    

    message: "What's your employee ID?",
    type: "input",
    name: "employeeId",
    validate: validateEmployeeId,
    filter: Number
    
  },{
    message: "What's your Email?",
    type: "input",
    name: "email",
    validate: validateEmail
  },
  
  ])


  then(answers => {
    console.log('Answers:', answers);
  });