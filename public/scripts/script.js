document.addEventListener('DOMContentLoaded', function() {
    fetch('../pages/contents/test-file.md', {mode: 'no-cors'})
        .then(response => response.text())
        .then(markdown => {
            const html = window.markdownit().render(markdown);

            document.getElementById('blog-content').innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar o arquivo local de markdown.'))
})