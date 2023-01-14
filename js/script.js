{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks,
        {
            content: newTaskContent,
        }]
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const toggleHideTaskDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks,
            done: true,
        }));
        render();
    };

    const bindButtonsEvents = () => {
        const allTasksDoneButtons = document.querySelector(".js-allTasksDone");
        const allTasksDoneHidden = document.querySelector(".js-allDoneTasksHidden");

        if (allTasksDoneButtons) {
            allTasksDoneButtons.addEventListener("click", () => {
                toggleAllTasksDone();
            })
        };

        if (allTasksDoneHidden) {
            allTasksDoneHidden.addEventListener("click", () => {
                toggleHideTaskDone();
            })
        };
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });

        });
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderButtons = () => {
        let htmlButtons = "";
        const taskCount = tasks.length;
        taskCount !== 0 ?
            htmlButtons += `
    <button class="js-allDoneTasksHidden"> ${hideDoneTasks ? "Pokaż": "Ukryj"} ukończone</button>
    <button class="js-allTasksDone" ${tasks.every(({done}) => done) ? " disabled" : ""}>Ukończ wszystkie</button>`
            : "";
        document.querySelector(".js-buttons").innerHTML = htmlButtons

    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="list ${task.done && hideDoneTasks ? " list--hidden" : ""}">
            <button class="js-done list__button list__button--done">${task.done ? "✔" : ""}</button>
            <span class="list__item${task.done ? " list__item--done" : ""}">${task.content}</span>
            <button class="js-remove list__button list__button--remove">🗑</button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const render = () => {
        renderTasks();
        bindEvents();
        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        newTaskElement.focus();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        document.querySelector(".js-newTask").value = "";
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}