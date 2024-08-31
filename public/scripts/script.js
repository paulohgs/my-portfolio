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
        if (activeBtn.id == pathMap["blog.html"]) {
            loadArticles()
        }
        activeBtn.classList.add('active');
    }
};

function loadArticles() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <h1>Blog</h1>
        <section id="galeria-artigos">
        </section>
    `
    fetch('/articles.json')
        .then(response => response.json())
        .then(data => {
            const galeriaArtigos = document.getElementById("galeria-artigos");
            data.articles.forEach( article => {
                const articleElement = document.createElement('div');
                articleElement.className = 'artigo';
                articleElement.setAttribute('data-id', article.id);
                articleElement.innerHTML = `
                    <img id="imagem-artigo" src="${article.img}" alt="Imagem do artigo">
                    <h2 id="titulo-artigo">${article.title}</h2>
                    <p id="resumo-artigo">${article.description}</p>
                `;
                articleElement.addEventListener('click', function () {
                    loadArticleContent(article.id);
                });
                galeriaArtigos.appendChild(articleElement);
            });
        })
        .catch(error => console.error(`Erro ao carregar os arquivos: ${error}`));
}


function loadArticleContent(articleID) {
    fetch('/articles.json')
    .then(response => response.json())
    .then(data => {
        const article = data.articles.find(element => element.id == articleID);
        showArticle(article);    
    })
}

function showArticle(article) {
    const main = document.querySelector('main');
    main.innerHTML = `
    <button id="botao-voltar" onclick="loadArticles()">Voltar</button>
    <article>
        <header>
            <h1>${article.title}</h1>
            <small>${article.author}</small>
        </header>
        <section>
            ${article.content}
            <figure>
                <img src="${article.img}" alt="imagem do artigo">
                <figcaption>${article.titulo}</figcaption>
            </figure>
        </section>
    </article>
    `;
}
