// Your code here
function createEmployeeRecord(array) {
  return {
    firstName : array[0],
    familyName : array[1],
    title : array[2],
    payPerHour : array[3],
    timeInEvents : [],
    timeOutEvents : []
  };
};

function createEmployeeRecords(arrays) {
  return arrays.map(
    array => createEmployeeRecord(array)
  );
};

function createTimeInEvent(employeeObject, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employeeObject.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })

  return employeeObject;
};

function createTimeOutEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })

  return employeeRecord;
};

function hoursWorkedOnDate (employeeRecord, dateSought) {
  let inEvent = employeeRecord.timeInEvents.find(element => {
    return element.date === dateSought;
  })

  let outEvent = employeeRecord.timeOutEvents.find(element => {
    return element.date === dateSought;
  })

  return (outEvent.hour - inEvent.hour) / 100
};

function wagesEarnedOnDate(employeeRecord, dateWorked) {
  let rawWages = hoursWorkedOnDate(employeeRecord, dateWorked) * employeeRecord.payPerHour

  return parseInt(rawWages, 10)
};

function allWagesFor(employeeRecord) {
  let datesWorked = employeeRecord.timeInEvents.map(element => {
    return element.date;
  })

  let payable = datesWorked.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employeeRecord, d)
  }, 0)

  return payable
};

function findEmployeeByFirstName(employeeArray, firstName) {
  return employeeArray.find(employee => employee.firstName === firstName)
};

function calculatePayroll(employeeArray) {
  return employeeArray.reduce(function(total, employeeWages) {
    return total + allWagesFor(employeeWages)
  }, 0)
};