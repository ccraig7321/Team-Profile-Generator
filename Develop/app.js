const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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
// for the provided `render` function to work! ```

var employeeArray = []
newEmployee()

function getManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        },
    ])
    .then(function(answers){
        var manager = new Manager(answers.name, employeeArray.length, answers.email, answers.officeNumber)
       employeeArray.push(manager)
       console.log(employeeArray)
       newEmployee()
    })
}

function getEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?"
        },
    ])
    .then(function(answers){
        var engineer = new Engineer(answers.name, employeeArray.length, answers.email, answers.github)
       employeeArray.push(engineer)
       console.log(employeeArray)
       newEmployee()
    })
}

function getIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?"
        },      {
            type: "input",
            name: "school",
            message: "What school did the intern attend?"
        },
    ])
    .then(function(answers){
        var intern = new Intern(answers.name, employeeArray.length, answers.email, answers.school)
       employeeArray.push(intern)
       console.log(employeeArray)
       newEmployee()
    })
}

function newEmployee(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What kind of employee do you want to create?",
            choices: ["Manager", "Engineer", "Intern", "None"]
        },
    ])
    .then(function(answers){
        if(answers.choice == "Manager"){
            getManager()
        }
        if(answers.choice == "Engineer"){
            getEngineer()
        }
        if(answers.choice == "Intern"){
            getIntern()
        }
        else{
            var html = render(employeeArray)
            fs.writeFile(outputPath, html, function(err){
                if (err){
                    return console.log(err);
                }
                // console.log("Success! File was written to team.html")
            })
        }
    })
}




    // User information that is entered takes user input and writes it to the page
    // .then(function (userAnswers) {
    // console.log(userAnswers);

    // var filename = (userAnswers.title + "log.md");
    // Sets readMe var equal to the generateReadMe functions with userAnswers as the input

    // fs.writeFile writes the user information onto the page - gives confirmation if correct

// })
