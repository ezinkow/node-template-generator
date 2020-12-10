const Employee = require("./Employee")

class Engineer extends Employee{
    constructor(name, id, email, github){  
        super(name,id,email)
        this.github = github
    }
    getGithub() {
        return this.github
        console.log(this.github)
    }

    getRole() {
        return "Engineer"
        console.log(this.id)
    }

    }

// const engineer = new Employee("")

// engineer.printInfo()

module.exports = Engineer