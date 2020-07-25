var $ = function (id) {
    return document.getElementById(id);
};
var tasks = [];
var sortDirection = "ASC";


var displayTaskList = function () {
    var list = "";
    if (tasks.length === 0) {
        // get tasks from storage or empty string if nothing is in storage
        var storage = localStorage.getItem("tasks") || "";

        //if there are tasks, convert to an array and store in global tasks variable
        if (storage.length > 0) {
            tasks = storage.split("|");
        }
    }
    // if there are tasks in the array, sort and create a capitalized tasks string
    if (tasks.length > 0) {
        if(sortDirection === "ASC"){
            tasks.sort();
        } else {
            tasks.reverse();
        }
        var capitalized = tasks.map(function (value) {
            var first = value.substring(0, 1); // get first letter
            var remaining = value.substring(1); //get remaining letters
            return first.toUpperCase() + remaining;
        });
    }

    // display the tasks string and set focus on the task text box
    $("task_list").value = capitalized && capitalized.join("\n") || "";
    $("task").focus();
};
var addToTaskList = function () {
    var task = $("task");
    if (task.value === "") {
        alert("Please enter a task.");
    } else {
        // add task to array and local storage
        tasks.push(task.value);
        localStorage.tasks = tasks.join("|");

        // clear the task text box and re-display tasks
        task.value = "";
        displayTaskList();
    }
};
var clearTaskList = function () {
    tasks.length = 0;
    localStorage.tasks = "";
    displayTaskList();
};

var deleteTask = function () {
    var index = parseInt(prompt("Please enter the index of the task"));
    if (!isNaN(index) || index === "") {
        tasks.splice(index, 1);
        localStorage.tasks = tasks.join("|");
        displayTaskList();
    }

};

var toggleSort = function() {
   sortDirection = (sortDirection == "ASC") ? "DESC" : "ASC";
   displayTaskList();
};
window.onload = function () {
    $("add_task").onclick = addToTaskList;
    $("clear_tasks").onclick = clearTaskList;
    $("delete_task").onclick = deleteTask;
    $("toggle_sort").onclick = toggleSort;
    displayTaskList();
};
