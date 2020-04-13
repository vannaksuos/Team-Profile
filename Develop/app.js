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
    }
    ])
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
          "engineer",
          "create page"
      ]
  }]) 
  .then(answers =>  {
     if(answers.type === "intern") {
       console.log("intern selected")
      internQuestion()
     }
     if(answers.type === "engineer") {
       engineerQuestion()
     }
     if(answers.type === "create page") {
       createPage()
     }
  })
}

function createPage() {
  // get all the team members from array
  const membersToCreate = teamMembers
  // generate html file base on team members
  const htmlOutput = render(teamMembers)
  // write the html to a file
  if(!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
fs.writeFileSync(outputPath, htmlOutput, "utf-8")
}

function internQuestion() {
  console.log("intern")
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
      createTeam()
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
      answer.github = engineerAnswer.github
    return answer
    
    })
    .then(answers => {
      const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(newEngineer)
    createTeam()
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
createManager ()
