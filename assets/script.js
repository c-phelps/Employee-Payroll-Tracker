// CJP 6/11/2024 JS updated and commented for clarity
// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
let tempArray = []; //declare tempArray globally so that it can keep its values when collectEmployees calls itself


// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
  let varFirstName;
  let varLastName;
  let varSalary = 0; //store salaray as a number not a string
  let tempObj = []; //temporary object for current function call

  // assign the value typed into the prompt to the first name variable
  varFirstName = prompt("Please enter the employee's first name.");
  // for authenticating, make sure that the first name variable is not empty
  while (!varFirstName){
    varFirstName = prompt("A value must be given for the employee's first name!")
  } 
  // assign the firstName property to the temporary object
  tempObj.firstName = varFirstName

  // assign the value typed into the prompt to the last name variable
  varLastName = prompt("Please enter the employee's last name.");
  // for authenticating, make sure that the last name variable is not empty
  while (!varLastName){
    varLastName = prompt(`A value must be given for ${varFirstName}'s last name!`)
  } 
  // assign the lastName property to the temporary object
  tempObj.lastName = varLastName

  // assign the value in the prompt to the salary
  varSalary = prompt("Please enter the employee's salary.")
  // while the salary is empty or not a number, request they add the salary for the user's name
  while (!varSalary || isNaN(varSalary)){
    varSalary = prompt(`You must enter a numeric value for ${varFirstName}'s salary. Please enter 0 if there is no salary.`)
  }
  // assign the salary property to the temporary object and make sure it is stored as a number
  tempObj.salary = Number(varSalary); //force it to number as even before it was being stored as a string

  // push the temporary object to a temporary array that will be returned once the user is done adding employee's
  tempArray.push(tempObj);
  
  // if ok continue adding objects to array, if no return the array of objects to the code calling the function
  if (confirm("Would you like to add another employee?")){
    // This particular line was causing a lot of issues. I had to do extensive research to find out why I was not passing the value of collectEmployees to the function that calls this one.
    // It turns out I needed to return the collectEmployees function in order to make the function recursive.
    // I am know there are far less complicated ways to achieve what I am trying to do, for example using a do while loop, but this fix works using my original code, and I am happy with it!
    return collectEmployees();
  }
  else {
    // return the tempArray holding our objects
    return tempArray;
  }
  
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
   // be sure to declare as a number otherwise it will concat the values to undefined or as strings!
  let varSumSalary = 0;
  let varAverage = 0;
  let varTotalEmployees = 0;
 
  // for each person object in the array sum the salary
  // also I am using the varTotalEmployees variable rather than a standard i in the for loop's condition since the count will be used outside the scope of this loop
  // otherwise I would require some additional code to count the loop iterations ex: varTotalEmployees++;
  for (varTotalEmployees = 0; varTotalEmployees < employeesArray.length; varTotalEmployees++){
    // sum up the salaries in the employeesArray --- salary sum = current salaray sum + current employee's salary
    varSumSalary += employeesArray[varTotalEmployees].salary;
  }
  
  // take the average, the sum of salaries divided by the employeesArray length and display this value with 2 decimal places
  varAverage = parseFloat(varSumSalary/varTotalEmployees).toFixed(2);
  // format the average as currency using the number formatter object

  console.log(`The average employee salary between our ${varTotalEmployees} employee(s) is $${varAverage}.`); // This bit of code converts our number to a value with 2 decimal places
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  let varRandIndex = 0;
  let varFullName;
  //set the varRandIndex = to a random int between 0 and the employeesArray.length
  varRandIndex = Math.floor(Math.random() * employeesArray.length);
  //set the full name variable = to the first name + the last name using the random index generated above
  varFullName = employeesArray[varRandIndex].firstName + " " + employeesArray[varRandIndex].lastName;
  // display the winner message to the console
  console.log(`Congratulations to ${varFullName}, our random drawing winner!`);
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
