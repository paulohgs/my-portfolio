window.onload = function () {
    const path = window.location.pathname.split('/').pop();
    const pathMap = {
        "index.html": "home-btn",
        "blog.html": "blog-btn",
        "projects.html": "projects-btn"
    };
    const buttons = document.querySelectorAll(".botao");
    buttons.forEach(button => button.classList.remove("active"));
    const activeBtn = document.getElementById(pathMap[path]);
    if(activeBtn) {
        activeBtn.classList.add('active');
    }
};
