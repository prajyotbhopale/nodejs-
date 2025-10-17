const fs =  require('fs');
const filePath = "./tasks.json";


function loadTasks() {
    try {
        const dataBuffer = fs.readFileSync(filePath)
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (error) {
        return [];
    }
}

function saveTasks(tasks) {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath,dataJSON)
}
function addTask(task) {
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("added task", task);

}

function listTasks(){
    const tasks = loadTasks();
    tasks.forEach((task, index)=> console.log(`${index + 1} - ${task.task}`));
};

function removeTask(index) {
    const tasks = loadTasks();
    const taskIndex = parseInt(index) - 1; // Convert argument to number

    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
        console.log("Invalid task number.");
        return;
    }

    const removed = tasks.splice(taskIndex, 1); // remove task at index
    saveTasks(tasks);
    console.log(`Removed task: ${removed[0].task}`);
}


const command = process.argv[2];
const argument = process.argv[3];
if (command === "add") {
    addTask(argument);
} else if (command === "list") {
    listTasks();
} else if (command === "remove") {
    removeTask(argument);
} else {
    console.log("command no found");
}
