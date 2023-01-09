{
    const tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {

        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    }

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
    <button>Ukryj ukończone</button>
    <button>Ukończ wszystkie</button>`
            : "";
        document.querySelector(".js-buttons").innerHTML = htmlButtons

    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="list">
            <button class="js-done list__button list__button--done">${task.done ? "✔" : ""}</button>
            <span class="list__item${task.done ? " list__item--done" : ""}">${task.content}</span>
            <button class="js-remove list__button list__button--remove">🗑</button>
        </li>
        `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
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