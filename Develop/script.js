// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
let tempArray = [];


// Collect employee data
const collectEmployees = function() {
  let varFirstName;
  let varLastName;
  let varSalary;
  // TODO: Get user input to create and return an array of employee objects

  // assign the value typed into the prompt to the first name variable
  varFirstName = prompt("Please enter the employee's first name.");
  // for authenticating, make sure that the first name variable is not empty
  while (!varFirstName){
    varFirstName = prompt("A value must be given for the employee's First Name!")
  } 
  // assign the value typed into the prompt to the last name variable
  varLastName = prompt("Please enter the employee's last name.");
  // for authenticating, make sure that the last name variable is not empty
  while (!varLastName){
    varLastName = prompt("A value must be given for the employee's Last Name!")
  } 
  // assign the value in the prompt to the salary
  varSalary = prompt("Please enter the employee's salary.")
  // while the salary is empty or not a number, request they add the salary for the user's name
  while (!varSalary || isNaN(varSalary)){
    varSalary = prompt(`You must enter a numeric value for ${varFirstName}'s salary. Please enter 0 if there is no salary.`)
  }
  // push the values to a temporary array that will be returned once the user is done adding employee's
  tempArray.push({
    firstName: varFirstName,
    lastName: varLastName,
    salary: varSalary
  });
  
  if (confirm("Would you like to add another employee?")){
    // This particular line was causing a lot of issues. I had to do extensive research to find out why I was not passing the value of collectemployees 
    // to the function that calls this one.
    // It turns out I needed to return the collectEmployees function in order to make the function recursive.
    // I am know there are far less complicated ways to achieve what I am trying to do, for example using a do while loop,
    // but this fix works using my original code, so I am happy with it!
    return collectEmployees();
  }
  else {
    // return the tempArray holding or objects
    return tempArray;
  }
  
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';
 
  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {   // CPhelps loop through the employeesArray - created by me and filled by collectEmployees()
    const currentEmployee = employeesArray[i]; // CPhelps sets the current employee to the current iteration of the loop - i

    const newTableRow = document.createElement("tr"); // CPhelps adds a new table row element to the page for each iteration - i

    const firstNameCell = document.createElement("td"); // CPhelps adds a table data element to the page for the current iteration's first name
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
