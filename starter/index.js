const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { exit } = require("process");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const teamMembers = [];

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the team manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the team employee's ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNumber",
      },
    ])
    .then(function (answers) {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      init();
   
    })
  }

  function init(){
  inquirer.prompt([
              {
                type: "list",
                  message: "Which type of team member would you like to add?",
                  choices: ["Engineer", "Intern", "Finish building the team"],
                name: "role",
              },
            ]).then(function (answers) {
              switch (answers.role) {
                case "Engineer":
                  addEngineer();
                  break;
                case "Intern":
                  addIntern();
                  break;
                case "Finish building the team":
                  buildTeam();
                  break;
                  
                
              }
            }
          )
        };


        function addEngineer(){
          inquirer
          .prompt([
            
              {
                type: "input",
                message: "What is the engineer's name?",
                name: "name",
              },
              {
                type: "input",
                message: "What is the engineer's ID?",
                name: "id",
              },
              {
                type: "input",
                message: "What is the engineer's email?",
                name: "email",
              },
              {
                type: "input",
                message: "What is the engineer's GitHub username?",
                name: "github",
              },

          
        ])
        .then(function (answers) {

        const engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        teamMembers.push(engineer);
        init();

      })};

      function addIntern (){
        inquirer
        .prompt([
          {
            type: "input",
            message: "What is the Intern's name?",
            name: "name",
          },
          {
            type: "input",
            message: "What is the Intern's ID?",
            name: "id",
          },
          {
            type: "input",
            message: "What is the Intern's email?",
            name: "email",
          },
          {
            type: "input",
            message: "What school did the Intern attend ?",
            name: "school",
          },

        ])
        .then(function (answers) {
          const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
          );
          teamMembers.push(intern);
          init();

        });
      };

      function buildTeam(){
        const html = render(teamMembers);
        fs.writeFile("team.html", html, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Team profile generated successfully!");
          }
        });
      }
        

        promptUser();
