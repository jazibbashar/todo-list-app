
Todo List Web App
This is a simple Todo List web application built with React. You can use it to keep track of your tasks, mark them as completed, edit task details, and delete tasks. The app also displays the date and time when each task was created.

Features
Add Task: You can add a new task by entering its name and clicking the "Create Task" button. If you try to add an empty task, the app will prompt you to enter a task name.

Edit Task: You can edit the name and description of a task by clicking the "Edit" button. This opens a modal where you can make your changes and save them. Once saved, the task will be updated with your edits.

Delete Task: If you want to remove a task from your list, click the "Delete" button next to the task. This action is irreversible, so be careful!

Mark as Completed: You can mark a task as completed by clicking the "Mark as Completed" radio button. Once marked as completed, the task will be crossed out, and the date and time when it was completed will be displayed.

Task History: Completed tasks are moved to a separate section, where you can see the date and time they were completed.

How to Use
Add a Task:

Enter a task name in the input field.
Click the "Create Task" button.
Edit a Task:

Click the "Edit" button next to the task you want to edit.
In the modal that opens, modify the task name and description.
Click the "Save" button to save your changes.
Delete a Task:

Click the "Delete" button next to the task you want to remove. Be aware that this action is irreversible.
Mark a Task as Completed:

Click the radio button labeled "Mark as Completed" next to the task you've finished.
View Completed Tasks:

Completed tasks are moved to a separate section, and you can see the date and time they were completed.
Local Storage
Your tasks are saved to your browser's local storage, so they will persist even if you close the app or refresh the page.

Get Started
To run this app on your local machine, follow these steps:

Clone this repository.
Open your terminal and navigate to the project directory.
Run npm install to install the required dependencies.
Run npm start to start the development server.
Open your web browser and go to http://localhost:3000.
Technologies Used
React
date-fns: A library for formatting dates and times.
Font Awesome: For icons used in the app.
