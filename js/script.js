{
    const tasks = [
        {
            content: "zrób zakupy",
            done: false,
        },
        {
            content: "odbierz dziecko z przedszkola",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="unorderedList">
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        render();
    };

    init();
}