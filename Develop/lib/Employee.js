// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email){
        this.name = name
        this.id = id
        this.email = email
    }

    printInfo() {
        console.log("this",this)
    for (const key in this) {
      console.log(`${key}: ${this[key]}`);
    }
    console.log(`
        Name: ${this.name}
        Position: ${this.id}
    `);
    }

    getName() {
        console.log(this.name)
    }
    getID() {
        console.log(this.id)
    }
    getEmail() {
        console.log(this.email)
    }
    getRole() {
        console.log("Employee")
    }
}

module.exports = Employee;