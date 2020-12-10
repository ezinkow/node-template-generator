const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArr = []

//questions to ask everyone
function questions (){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your employee ID?",
            name: "id",
        },
        {
            type: "list",
            message: "What is your title?",
            name: "title",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
            ],
        }
    ])
//jump to conditional function to determine next question based on title
        .then(conditional)
}
//run questions function
questions()

//functions for questions to specific titles
function manager() {
    const promptArr = [
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber",
        }
    ]
    return inquirer.prompt(promptArr)
}

function engineer() {
    const promptArr = [
         {
            type: "input",
            message: "What is your gitbub username?",
            name: "github",
        },
    ]
    return inquirer.prompt(promptArr)
}

function intern() {
    const promptArr = [
         {
            type: "input",
            message: "What school do you attend?",
            name: "school",
        },
    ]
    return inquirer.prompt(promptArr)
}

//function to create team template or add more team members
function printTeam() {
    const promptArr = [
        {
            type: "list",
            message: "Create team now or add more team members?",
            name: "printTeam",
            choices: [
                "Create team",
                "Add more team members",
            ]
        }
    ]
    return inquirer.prompt(promptArr)
}

//conditionals to determine next question based on title
function conditional(input) {
    if (input.title === "Manager") {
        manager().then(function (response) {
            input.officeNumber = response.officeNumber
            //new manager to gather manager responses
            let manager = new Manager(input.name,input.id,input.email,input.officeNumber)
            employeeArr.push(manager)

            //ask to create team or add more members
            printTeam().then(function(answer){
                if(answer.printTeam === "Create team"){
                    let htmlPage = render(employeeArr)
                    fs.writeFile(outputPath,htmlPage,function(err){
                        if(err){
                            throw err
                        }
                        console.log("Team page made!")
                    })
                }
                else {
                    questions()
                }
            })
        })
    }
        else if (input.title === "Engineer") {
            engineer().then(function (response) {
            input.github = response.github
            let engineer = new Engineer(input.name,input.id,input.email,input.github)
            employeeArr.push(engineer)

            printTeam().then(function(answer){
                if(answer.printTeam === "Create team"){
                    let htmlPage = render(employeeArr)
                    fs.writeFile(outputPath,htmlPage,function(err){
                        if(err){
                            throw err
                        }
                        console.log("Team page made!")
                    })
                }
                else {
                    questions()
                }
            })
        })
        }
        else if (input.title === "Intern") {
            intern().then(function (response) {
            input.school = response.school
            let intern = new Intern(input.name,input.id,input.email,input.school)
            employeeArr.push(intern)

            printTeam().then(function(answer){
                if(answer.printTeam === "Create team"){
                    let htmlPage = render(employeeArr)
                    fs.writeFile(outputPath,htmlPage,function(err){
                        if(err){
                            throw err
                        }
                        console.log("Team page made!")
                    })
                }
                else {
                    questions()
                }
            })
        })
        }
}