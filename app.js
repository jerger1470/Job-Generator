const inquirer = require('inquirer');
// const render = require("/HTMLrender");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const teamMembers = [];


function askPosition(){

  inquirer
    .prompt([
    {
        message: "What is your position?",
        type: "list",
        name: "position",
        choices:["Engineer", "Manager", "Intern" ],
                
    }

  ])
    .then(answers => {
      if(answers.position == "Engineer"){
        runEngineer();
      } else if(answers.position == "Manager"){
        runManager();
      } else if(answers.position == "Intern"){
        runIntern();
      }
    });
  };
   
function runEngineer(){

  console.log("You are an Engineer, please have your manager return info!");
  
};

function runIntern(){

  console.log("You are a Intern, this application is for managers only!");
  
};

function runManager(){

  console.log("You are a Manager");

  inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?"
    },
    {
        type: "input",
        name: "office",
        message: "What is your manager's office number?"
    }
  ])
.then(function (answers) {
  const manager = new Manager(answers.name, parseInt(answers.id), answers.email, parseInt(answers.office));
  teamMembers.push(manager);
  addMember();
});
}

function addMember() {
  inquirer.prompt([
      {
          type: "list",
          name: "type",
          message: "Which type of team member would you like to add?",
          choices: [
              "Engineer",
              "Intern",
              "I don't want to add any more team members"
          ]

      }
  ]).then(function(answer) {
      if(answer.type === "Engineer") {
          createEngineer();
      }
      else if (answer.type === "Intern") {
          createIntern();
      }
      else {
          render(teamMembers);
      }

  })
}

function createEngineer () {
  inquirer.prompt([
      {
          type: "input",
          name: "name",
          message: "Engineer's name?"
      },
      {
          type: "input",
          name: "id",
          message: "Engineer's id?"
      },
      {
          type: "input",
          name: "email",
          message: "Engineer's email?"
      },
      {
          type: "input",
          name: "github",
          message: "What is their github?"
      }

  ]).then(function (answers) {
      const engineer = new Engineer(answers.name, parseInt(answers.id), answers.email, answers.github);
      teamMembers.push(engineer);
      addMember();
  });

}

function createIntern () {
  inquirer.prompt([
      {
          type: "input",
          name: "name",
          message: "What is your intern's name?"
      },
      {
          type: "input",
          name: "id",
          message: "What is your intern's id?"
      },
      {
          type: "input",
          name: "email",
          message: "What is your intern's email?"
      },
      {
          type: "input",
          name: "school",
          message: "What is your intern's school?"
      }

  ]).then(function (answers) {
      const intern = new Intern(answers.name, parseInt(answers.id), answers.email, answers.school);
      teamMembers.push(intern);
      addMember();
  });

}



askPosition(); 