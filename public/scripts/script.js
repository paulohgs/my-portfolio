document.addEventListener('DOMContentLoaded', function() {
    function load_md_file(md_file) {
        fetch(`../pages/contents/${md_file}`, {mode: 'no-cors'})
        .then(response => response.text())
        .then(markdown => {
            const html = window.markdownit().render(markdown);

            document.getElementById('blog-content').innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar o arquivo local de markdown.'));
    }

    function load_namefiles() {
        const article_list = ['test-file.md'];
        const container = document.getElementById('article-links');

        article_list.forEach(article => {
            const link = document.createElement('a');
            link.href = article
            link.textContent = get_name(article)
            link.onclick = function(event) {
                event.preventDefault();
                load_md_file(article);
            };
            container.appendChild(link);
        });
    }

    function get_name(article) {
        return article.replace(/\.[^/.]+$/, "");
    }

    load_namefiles()
});

