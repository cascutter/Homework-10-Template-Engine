// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }


    // Method which returns name
    getName() {
        return this.name;
    }

    // Method which gets ID
    getId() {
        return this.id;
    }

    //Method which gets email 
    getEmail() {
        return this.email;
    }

    // Method which returns role (Employee)
    getRole() {
        return "Employee";
    }
}

module.exports = Employee;