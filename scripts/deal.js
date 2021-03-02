var myData = [
  {"dealId" : 0, "client_name" : "Microsoft", "project_name" : "Apollo Project", "project_manager" : "Mary", "project_cost" : 1000.01},
  {"dealId" : 1, "client_name" : "Intel", "project_name" : "Hermes Project", "project_manager" : "Bob", "project_cost" : 10000.02},
  {"dealId" : 2, "client_name" : "Apple", "project_name" : "Zeus Project", "project_manager" : "Jane", "project_cost" : 100000.03}, 
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

  var tableHeaders = ["ID", "Client", "Project Name", "Project Manager", "Cost", "Delete", "Edit"];

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
      // Insert Extra Cell for the Delete Icon
      var tabCell = tr.insertCell(-1);
      tabCell.setAttribute("id", "delete_button");
      tabCell.innerHTML = '<button onclick="deleteDeal(' + myData[i].dealId + ')" class="btn btn-sm"> <i class="fas fa-trash"></button>'

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

function addedMessage() {
  document.getElementById("dealMessage").innerHTML="New deal has been added!";
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
function checkDealInput() {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.onsubmit = function (e) {
        if (!form.checkValidity()) {
          e.preventDefault()  // prevents from submitting a form
          e.stopPropagation() // prevents propagation of the same event from being called
          form.classList.add('was-validated')
        } else {
          e.preventDefault()
          e.stopPropagation()
          addNewDeal()
          addedMessage()
          form.classList.remove('was-validated')
          form.reset()
        }
      }
    })
}

function addNewDeal() {
  var clientName = document.getElementById("clientNameInput").value;
  var projectName = document.getElementById("projectNameInput").value;
  var projectManager = document.getElementById("projectManagerInput").value;
  var projectCost = document.getElementById("projectCostInput").value;

  InsertRow(currentDealId, clientName, projectName, projectManager, projectCost);
}

function InsertRow(dealId, clientName, projectName, projectManager, projectCost) {
  myData.push({"dealId": dealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_cost" : projectCost})
  currentDealId++;
  createTableFromJSON();
}

function deleteDeal(dealId) {
  for( var i = 0; i < myData.length; i++){ 
    if ( myData[i].dealId === dealId) { 
      myData.splice(i, 1); 
    }
  }
  createTableFromJSON();
  document.getElementById("dealMessage").innerHTML="Deal #"+dealId+" was deleted!";
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
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
function checkEditDeal(dealId) {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
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
          document.getElementById("dealFormHeader").innerHTML = "Add Deal";
          document.getElementById("submitDiv").innerHTML = '<button type="submit" class="btn btn-secondary" onclick="checkDealInput()" id="addButton">Add</button>';

          form.reset()
        }
      }
    })
}

function getEditForm(dealId) {
  document.getElementById("dealFormHeader").innerHTML = "Edit Deal";
  document.getElementById("submitDiv").innerHTML = '<button type="submit" class="btn btn-secondary" onclick="checkEditDeal('+dealId+')" id="updateButton">Update</button>';

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