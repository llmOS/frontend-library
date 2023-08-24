import styles from "./css/main.scss";

(function (window, document) {

    function fetchData(endpoint) {
        // return fetch(endpoint).then(response => response.json());
        const data = [
            {headline: "test 1"},
            {headline: "test 2"},
            {headline: "test 3"},
            {headline: "test 4"},
        ]
        console.log(data)
        return data
    }

    function renderNews(newsData) {
        let container = document.createElement('div');

        newsData.forEach(news => {
            let article = document.createElement('p');
            article.textContent = news.headline;
            container.appendChild(article);
        });

        return container;
    }

    function initializeWidget(options) {
        const defaultOptions = {
            endpoint: 'https://your-api.com/news',
            containerId: 'news-widget-container'
        };

        const config = {...defaultOptions, ...options};
        // const data = fetchData(config.endpoint)
        // const renderedWidget = renderNews(data);
        // document.getElementById(config.containerId).appendChild(renderedWidget);


        const container = document.createElement('div');
        const element = document.createElement('p');
        element.className = "random"
        element.textContent = "This text comes from widget with its own style"
        container.appendChild(element);

        const style = document.createElement("style")
        style.innerHTML = styles.toString()
        container.appendChild(style)

        document.getElementById(config.containerId).appendChild(container);

        // document.getElementById(config.containerId).innerHTML = `
        // <style>${styles.toString()}</style>
        // <p>random widget text</p>
        // `
    }

    // Expose the initialize function to the global scope for clients to use
    window.OpenCopilot = {initialize: initializeWidget};

})(window, document);
