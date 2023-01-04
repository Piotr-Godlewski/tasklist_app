{
    const tasks = [
        {
            content: "zrób zakupy",
            done: false,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item${task.done ? " list__item--done" : ""}">
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const addNewTask = (newTaskContent) => {

        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    }


const init = () => {
    render();
    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
};

init();
}