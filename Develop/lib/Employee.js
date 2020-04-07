// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
      this.id = id;
      this.email = email;
      this.name = name;
      this.role = "Employee";
    }
    getName() {
        return this.name
    }
    getEmail() {
        return this.email
    }
    getId() {
        return this.id
    }
    getRole() {
        return this.role
    }
  }


  module.exports = Employee