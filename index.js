#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
// while(condition){
// let addTask= await inquirer.prompt(
//     [
//     {
//         name:"firstQuestion",
//         type:"input",
//         message:"What would you like to add in your todos?"
//     },
//     {
//         name:"secondQuestion",
//         type:"confirm",
//         message:"Would you like to add more in your todos?",
//         default:"true"
//     }
// ]
// );
// todos.push(addTask.firstQuestion);
// console.log(todos)
// // The loop will run on the basis of this condition
// condition = addTask.secondQuestion
// }
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select an operation",
            choices: ["Add", "Update", "View", "Delete", "Exit"]
        }
    ]);
    if (ans.select === "Add") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add items in the list",
            // it removes whites space character and shows empty element 
            validate: function (input) {
                if (input.trim() == "") {
                    return "Please enter an item.";
                }
                return true;
            }
        });
        todos.push(addTodo.todo);
        console.log(todos);
    }
    if (ans.select === "Update") {
        let updateTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "Update items in the list",
            choices: todos.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add items in the list"
        });
        let newTodo = todos.filter(value => value !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        console.log(todos);
    }
    if (ans.select === "View") {
        console.log("****TO-DO LIST****");
        console.log(todos);
    }
    if (ans.select === "Delete") {
        let deleteTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "Select items to delet",
            choices: todos.map(item => item)
        });
        let newTodo = todos.filter(value => value !== deleteTodo.todo);
        todos = [...newTodo];
        console.log(todos);
    }
    if (ans.select === "Exit") {
        console.log("Exiting program....");
        condition = false;
    }
}
