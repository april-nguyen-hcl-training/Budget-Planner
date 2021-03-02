var myData = [
  {"dealId" : 0, "client_name" : "Microsoft", "project_name" : "Apollo Project", "project_manager" : "Logan", "project_cost" : 1000.01},
  {"dealId" : 1, "client_name" : "Intel", "project_name" : "Hermes Project", "project_manager" : "Bob", "project_cost" : 10000.02},
  {"dealId" : 2, "client_name" : "Apple", "project_name" : "Zeus Project", "project_manager" : "Jane", "project_cost" : 100000.03}, 
  {"dealId" : 3, "client_name" : "Total Wine", "project_name" : "Dionysus Project", "project_manager" : "John", "project_cost" : 40000.04}
]

var currentDealId = myData.length;

// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   

localStorage.setItem("myData", "test")

var myDataTest = localStorage.getItem("myData")

function createTableFromJSON() {    
  // EXTRACT VALUE FOR HTML HEADER. 
  // ('Deal ID', 'Deal Name', 'Category' and 'Price')
  var col = [];
  for (var i = 0; i < myData.length; i++) {
      for (var key in myData[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }

  var tableHeaders = ["ID", "Client", "Project Name", "Project Manager", "Cost", "Edit"];

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");
  table.className = "table";

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);                  // TABLE ROW.

  for (var i = 0; i < tableHeaders.length; i++) {
    var th = document.createElement("th");      // TABLE HEADER.
    th.innerHTML = tableHeaders[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < myData.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.setAttribute("id", col[j]);
          tabCell.innerHTML = myData[i][col[j]];
      }

      // Insert Extra Cell for the Update Icon
      var tabCell = tr.insertCell(-1);
      tabCell.setAttribute("id", "update_button");
      tabCell.innerHTML = '<button onclick="getEditForm(' + myData[i].dealId + ')" class="btn btn-sm"> <i class="fas fa-edit"></button>'

  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

function updateDeal(dealId) {
  var clientName = document.getElementById("clientNameInput").value;
  var projectName = document.getElementById("projectNameInput").value;
  var projectManager = document.getElementById("projectManagerInput").value;
  var projectCost = document.getElementById("projectCostInput").value;

  for( var i = 0; i < myData.length; i++){ 
    if ( myData[i].dealId === dealId) { 
      myData[i].client_name = clientName;
      myData[i].project_name = projectName;
      myData[i].project_manager = projectManager;
      myData[i].project_cost = projectCost;
    }
  }
  createTableFromJSON();
  createBudgetTableFromJSON();
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
function checkEditDeal(dealId) {
  'use strict'

  // Fetch the form we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  var form = document.getElementById("dealForm");

  form.onsubmit = function (e) {
    if (!form.checkValidity()) {
      e.preventDefault()  // prevents from submitting a form
      e.stopPropagation() // prevents propagation of the same event from being called
      form.classList.add('was-validated')
    } else {
      e.preventDefault()
      e.stopPropagation()

      updateDeal(dealId)
      document.getElementById("dealMessage").innerHTML="Deal #"+dealId+" was updated!";

      form.classList.remove('was-validated')
      document.getElementById("dealFormHeader").innerHTML = "Deal";
      document.getElementById("submitDealDiv").innerHTML = '';

      form.reset()
    }
  }

}

function getEditForm(dealId) {
  document.getElementById("dealFormHeader").innerHTML = "Edit Deal";
  document.getElementById("submitDealDiv").innerHTML = '<button type="submit" class="btn btn-secondary" onclick="checkEditDeal('+dealId+')" id="updateButton">Update</button>';

  var clientName, projectName, projectManager, projectCost;
  for( var i = 0; i < myData.length; i++){ 
    if ( myData[i].dealId === dealId) { 
      clientName = myData[i].client_name;
      projectName = myData[i].project_name;
      projectManager = myData[i].project_manager;
      projectCost = myData[i].project_cost;
    }
  }

  document.getElementById("clientNameInput").value = clientName;
  document.getElementById("projectNameInput").value = projectName;
  document.getElementById("projectManagerInput").value = projectManager;
  document.getElementById("projectCostInput").value = projectCost;
}

// ******* BUDGET *******

// BUDGET DATA
var myBudget = [
  {"budgetId" : 0, "budget_name" : "2021 Q1", "deal_ids" : [0, 1]}
]
var currentBudgetId = myBudget.length;
// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   
localStorage.setItem("myBudget", "test")
var budgetDataTest = localStorage.getItem("myBudget")

// CREATE BUDGET TABLE
function createBudgetTableFromJSON() {    
  // EXTRACT VALUE FOR HTML HEADER. 
  // ('Budget ID', 'Budget Name', and 'Deal IDs')
  var budgetCol = [];
  for (var i = 0; i < myBudget.length; i++) {
      for (var key in myBudget[i]) {
          if (budgetCol.indexOf(key) === -1) {
            budgetCol.push(key);
          }
      }
  }

  var budgetTableHeaders = ["ID", "Name", "Deal IDs", "Total Cost", "Delete", "Edit"];

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");
  table.className = "table";

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1);                  // TABLE ROW.

  for (var i = 0; i < budgetTableHeaders.length; i++) {
    var th = document.createElement("th");      // TABLE HEADER.
    th.setAttribute("id", budgetTableHeaders[i]);
    th.innerHTML = budgetTableHeaders[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < myBudget.length; i++) {
      tr = table.insertRow(-1);

      for (var j = 0; j < budgetCol.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.setAttribute("id", budgetCol[j]);
          tabCell.innerHTML = myBudget[i][budgetCol[j]];
      }
      // Insert Extra Cell for the Budget's Total Cost
      var dealIds = myBudget[i].deal_ids;
      var totalCost = 0.00;
      for(var m = 0; m < dealIds.length; m++){ 
        for(var n = 0; n < myData.length; n++){ 
          if(myData[n].dealId === dealIds[m]) { 
            totalCost += Number(myData[n].project_cost)
          }
        }
      }
      var tabCell = tr.insertCell(-1);
      tabCell.setAttribute("id", "budget_Total");
      tabCell.innerHTML = totalCost;

      // Insert Extra Cell for the Delete Icon
      var tabCell = tr.insertCell(-1);
      tabCell.setAttribute("id", "delete_button");
      tabCell.innerHTML = '<button onclick="deleteBudget(' + myBudget[i].budgetId + ')" class="btn btn-sm"> <i class="fas fa-trash"></button>'

      // Insert Extra Cell for the Update Icon
      var tabCell = tr.insertCell(-1);
      tabCell.setAttribute("id", "update_button");
      tabCell.innerHTML = '<button onclick="getEditBudgetForm(' + myBudget[i].budgetId + ')" class="btn btn-sm"> <i class="fas fa-edit"></button>'

  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showBudget");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

// BUDGET FORM CHECKBOXES
function createCheckboxes() {
  for (var i = 0; i < myData.length; i++) {
    var divContainer = document.createElement("div");
    divContainer.className = "form-check";

    var label= document.createElement("label");
    label.innerHTML = "#" + myData[i].dealId + ": " + myData[i].project_name;
    label.className = "form-check-label";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";    // make the element a checkbox
    checkbox.value = myData[i].dealId;         // make its value "pair"
    checkbox.className = "form-check-input";
    checkbox.name = "dealCheckbox";

    // add the label element to your div
    divContainer.appendChild(checkbox)
    divContainer.appendChild(label)
    document.getElementById('checkboxesDiv').appendChild(divContainer);
  }
}

// BUDGET ADD
function addNewBudget() {
  var budgetName = document.getElementById("budgetNameInput").value;
  var dealIds = [];

  var checkboxes = document.getElementsByName("dealCheckbox");
  checkboxes.forEach(function(e) {
    if(e.checked) {
      dealIds.push(Number(e.value));
    }
  })

  InsertRow(currentBudgetId, budgetName, dealIds);
}
function InsertRow(budgetId, budgetName, dealIds) {
  myBudget.push({"budgetId": budgetId, "budget_name" : budgetName, "deal_ids" : dealIds})
  currentBudgetId++;
  createBudgetTableFromJSON();
}
function addedMessage() {
  document.getElementById("budgetMessage").innerHTML="New Budget has been added!";
}
// ADD BUDGET FORM SUBMIT
function checkBudgetInput() {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var form = document.getElementById("budgetForm");
  // Loop over them and prevent submission
  form.onsubmit = function (e) {
    if (!form.checkValidity()) {
      e.preventDefault()  // prevents from submitting a form
      e.stopPropagation() // prevents propagation of the same event from being called
      form.classList.add('was-validated')
    } else {
      e.preventDefault()
      e.stopPropagation()
      addNewBudget()
      addedMessage()
      form.classList.remove('was-validated')
      form.reset()
    }
  }
}

// BUDGET DELETE
function deleteBudget(budgetId) {
  for( var i = 0; i < myBudget.length; i++){ 
    if ( myBudget[i].budgetId === budgetId) { 
      myBudget.splice(i, 1); 
    }
  }
  createBudgetTableFromJSON();
  document.getElementById("budgetMessage").innerHTML="Budget #"+budgetId+" was deleted!";
}

// BUDGET UPDATE
function updateBudget(budgetId) {
  var budgetName = document.getElementById("budgetNameInput").value;
  var dealIds = [];

  var checkboxes = document.getElementsByName("dealCheckbox");
  checkboxes.forEach(function(e) {
    if(e.checked) {
      dealIds.push(Number(e.value));
    }
  })

  for( var i = 0; i < myBudget.length; i++){ 
    if (myBudget[i].budgetId == budgetId) { 
      myBudget[i].budget_name = budgetName;
      myBudget[i].deal_ids = dealIds;
    }
  }
  createBudgetTableFromJSON();
}

// EDIT BUDGET FORM SUBMIT
function checkEditBudget(budgetId) {
  'use strict'

  // Fetch all the form we want to apply custom Bootstrap validation styles to
  var form = document.getElementById("budgetForm");
  // Loop over them and prevent submission
  form.onsubmit = function (e) {
    if (!form.checkValidity()) {
      e.preventDefault()  // prevents from submitting a form
      e.stopPropagation() // prevents propagation of the same event from being called
      form.classList.add('was-validated')
    } else {
      e.preventDefault()
      e.stopPropagation()
      
      updateBudget(budgetId)
      document.getElementById("budgetMessage").innerHTML="Budget #"+budgetId+" was updated!";

      form.classList.remove('was-validated')
      document.getElementById("budgetFormHeader").innerHTML = "Add Budget";
      document.getElementById("submitBudgetDiv").innerHTML = '<button type="submit" class="btn btn-secondary" onclick="checkBudgetInput()" id="addBudgetButton">Add</button>';

      form.reset()
    }
  }
}

function getEditBudgetForm(budgetId) {
  document.getElementById("budgetFormHeader").innerHTML = "Edit Budget";
  document.getElementById("submitBudgetDiv").innerHTML = '<button type="submit" class="btn btn-secondary" onclick="checkEditBudget('+budgetId+')" id="updateButton">Update</button>';

  var budgetName;
  var dealIds = [];
  for(var i = 0; i < myBudget.length; i++){ 
    if (myBudget[i].budgetId === budgetId) { 
      budgetName = myBudget[i].budget_name;
      dealIds = myBudget[i].deal_ids;
    }
  }

  document.getElementById("budgetNameInput").value = budgetName;

  var checkboxes = document.getElementsByName("dealCheckbox");
  checkboxes.forEach(function(e) {
    for(var j=0; j < dealIds.length; j++)
    {
      if(e.value == dealIds[j]) {
        e.checked = true;
      }
    }
  })

}



