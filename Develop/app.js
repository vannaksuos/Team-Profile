const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const teamMembers = [];
// Write code to use inquirer to gather information about the development team members,

function createManager (){
  inquirer
    .prompt([{
        message: "What is your name?",
        name: "name"
    },
    {
        message: "What is your employee ID?",
        name : "id"
    },
    {  
        message: "What is your email address?",
        name: "email" 
    },
    {
        message: "What is your office number?",
        name: "officeNumber"
    }])
    .then(answers => {
      const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      teamMembers.push(newManager)
      createTeam()
    })
  }

function createTeam () {
  inquirer
  .prompt([{
      message: "What type of employee?",
      name: "type",
      type: "list", 
      choices: [
          "intern",
          "engineer"
      ]
  }]) 
  .then(answers =>  {
     if(answer.type === "intern") {
      internQuestion()
     }
     if(answer.type === "engineer") {
       engineerQuestion()
     }
  })
}

function internQuestion() {
    employeeQuestion()
    .then(answer => {
      return inquirer
      .prompt([{
        message: "What school did you attended?",
        name: "school"
      }])
      .then(internAnswer => {
        answer.school = internAnswer.school
       return answer
      
      })
      .then(answers => {
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
      teamMembers.push(newIntern)
      })
    })
}
function engineerQuestion() {
  employeeQuestion()
  .then(answer => {
    return inquirer
    .prompt([{
      message: "Whats your github user name",
      name: "github"
    }])
    .then(engineerAnswer => {
      answer.engineer = engineerAnswer.github
     return answer
    
    })
    .then(answers => {
      const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(newEngineer)
    })
  })
}
function employeeQuestion() {
  return inquirer
  .prompt([{
      message: "What is your name?",
      name: "name"
  },
  {
      message: "What is your employee ID?",
      name : "id"
  },
  {  
      message: "What is your email address?",
      name: "email" 
  }])
}
inquirer
    .prompt([{
        message: "What is your name?",
        name: "name"
    },
    {
        message: "What is your employee ID?",
        name : "id"
    },
    {  
        message: "What is your email address?",
        name: "email" 
    },
    {   message: "What type of employee?",
        name: "type",
        type: "list", 
        choices: [
            "intern",
            "engineer"
        ]
    }]) 
    .then(answers =>  {
       if(answer.type === "intern") {
        internQuestion()
       }
       if(answer.type === "engineer") {
         engineerQuestion()
       }
    })
    //   .catch(error => {
    //     if(error.isTtyError) {
    //       // Prompt couldn't be rendered in the current environment
    //     } else {
    //     Something else when wrong
    //     }
    //   });


// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templates divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```