import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything?q=Farmers&from=2024-03-9&sortBy=popularity&apiKey=87f032dcf8754822a153b9e3da2a3bdc', {
                    params: {
                        q: 'agriculture',
                        apiKey: '87f032dcf8754822a153b9e3da2a3bdc',
                    },
                });
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <h2>Agriculture News</h2>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default News;
