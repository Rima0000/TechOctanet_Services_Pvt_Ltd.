window.onload = () => {
    const form1 = document.querySelector("#addForm");
    let items = document.getElementById("items");
    let submit = document.getElementById("submit");
    let themeToggle = document.getElementById("theme-toggle");

    let editItem = null;

    form1.addEventListener("submit", addItem);
    items.addEventListener("click", modifyItem);
    themeToggle.addEventListener("click", toggleTheme);

    loadTheme();
};

function addItem(e) {
    e.preventDefault();

    if (submit.value !== "Submit") {
        editItem.target.parentNode.childNodes[0].data = document.getElementById("item").value;
        submit.value = "Submit";
        document.getElementById("item").value = "";
        showSuccessMessage("Task edited successfully");
        return false;
    }

    let newItem = document.getElementById("item").value;
    let priority = document.getElementById("priority").value;
    if (newItem.trim() === "" || newItem.trim() === null) return false;

    let li = document.createElement("li");
    li.className = `list-group-item ${priority.toLowerCase()}`;

    li.appendChild(document.createTextNode(newItem));

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn btn-sm float-right delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    let editButton = document.createElement("button");
    editButton.className = "btn-success btn btn-sm float-right edit";
    editButton.appendChild(document.createTextNode("Edit"));

    let completeButton = document.createElement("button");
    completeButton.className = "btn-secondary btn btn-sm float-right complete";
    completeButton.appendChild(document.createTextNode("Complete"));

    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.appendChild(completeButton);

    items.appendChild(li);

    document.getElementById("item").value = "";
    submit.disabled = true;
    showSuccessMessage("Task added successfully");
}

function modifyItem(e) {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
            let li = e.target.parentNode;
            items.removeChild(li);
            showSuccessMessage("Task deleted successfully");
        }
    }
    if (e.target.classList.contains("edit")) {
        document.getElementById("item").value = e.target.parentNode.childNodes[0].data;
        submit.value = "EDIT";
        editItem = e;
    }
    if (e.target.classList.contains("complete")) {
        e.target.parentNode.classList.toggle("completed");
        showSuccessMessage("Task status updated");
    }
}

function toggleButton(ref, btnID) {
    document.getElementById(btnID).disabled = ref.value.trim() === "";
}

function showSuccessMessage(message) {
    document.getElementById("lblsuccess").innerHTML = message;
    document.getElementById("lblsuccess").style.display = "block";
    setTimeout(() => {
        document.getElementById("lblsuccess").style.display = "none";
    }, 3000);
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    document.querySelectorAll("input, select").forEach(el => {
        el.classList.toggle("dark-theme");
    });
    document.querySelectorAll("li.list-group-item").forEach(li => {
        if (li.classList.contains("completed")) {
            li.classList.toggle("dark-theme");
        }
    });
    saveThemePreference();
}

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        document.querySelectorAll("input, select").forEach(el => {
            el.classList.add("dark-theme");
        });
        document.querySelectorAll("li.list-group-item.completed").forEach(li => {
            li.classList.add("dark-theme");
        });
    }
}

function saveThemePreference() {
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.removeItem("theme");
    }
}

function filterTasks(status) {
    let tasks = document.querySelectorAll("li.list-group-item");
    tasks.forEach(task => {
        switch (status) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "pending":
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
        }
    });
}

function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        document.getElementById("items").innerHTML = "";
        showSuccessMessage("All tasks cleared");
    }
}
