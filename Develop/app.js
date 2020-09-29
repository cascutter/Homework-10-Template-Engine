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

function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                } 
                return "Please enter at least one character."
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID?",
            validate: answer => {
                const pass = answer.match(/^[1-9]\d*$/);
                if(pass) {
                    return true;
                }
                return "Please enter numbers only."
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?", 
            validate: answer => {
                const pass = answer.match(/\S+@\S+\.\S+/);
                if(pass) {
                    return true;
                }
                return "Please enter a valid email adress."
            }
        },
        {
            type: "input",
            name: "office",
            message: "What is your office number?",
            validate: answer => {
                const pass = answer.match(/^[1-9]\d*$/);
                if(pass) {
                    return true;
                }
                return "Please enter numbers only."
            }
        },
    ]).then(function (answers) {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
        teamMembers.push(manager);
        addTeamMember();
    })
}

function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "empType",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members."
            ]
        }
    ]).then(function (answer) {
        if(answer.empType === "Engineer") {
            createEngineer();
        } else if(answer.empType === "Intern") {
            createIntern();
        } else {
            console.log("Your team has been created!")
            buildTeam();
        }
    })
}

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                } 
                return "You must enter at least one character."
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is this engineer's ID?",
            validate: answer => {
                const pass = answer.match(/^[1-9]\d*$/);
                if(pass) {
                    return true;
                }
                return "Please enter numbers only."
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is this engineer's email address?",
            validate: answer => {
                const pass = answer.match(/\S+@\S+\.\S+/);
                if(pass) {
                    return true;
                }
                return "Please enter a valid email adress."
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is this engineer's GitHub?",
            validate: answer => {
                const pass = answer.match(
                    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
                    );
                if(pass) {
                    return true;
                }
                return "Please enter a valid URL."
            }
        },
    ]).then(function (answers) {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        addTeamMember();
    })
}

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                } 
                return "You must enter at least one character."
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?",
            validate: answer => {
                const pass = answer.match(/^[1-9]\d*$/);
                if(pass) {
                    return true;
                }
                return "Please enter numbers only."
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
            validate: answer => {
                const pass = answer.match(/\S+@\S+\.\S+/);
                if(pass) {
                    return true;
                }
                return "Please enter a valid email adress."
            }
        },
        {
            type: "input",
            name: "school",
            message: "What school does the intern attend?",
            validate: answer => {
                if(answer !== "") {
                    return true;
                } 
                return "You must enter at least one character."
            }
        },
    ]).then(function (answers) {
        const engineer = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(engineer);
        addTeamMember();
    })
}

function buildTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

createManager();


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
