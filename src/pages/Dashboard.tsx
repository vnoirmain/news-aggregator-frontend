import Navigation from "components/Navigation";
import { useAuth } from "hooks/useAuth";
import { useCategories } from "hooks/useCategories";
import { useNews } from "hooks/useNews";
import { useEffect, useState } from "react";
import { Category } from "types/Category";
import { Criteria } from "types/Criteria";
import { DataSource } from "types/DataSource";

export default function Dashboard() {
    const { user } = useAuth();
    const [criteria, setCriteria] = useState<Criteria>({
        source: DataSource.newsapi,
        category: '',
        author: '',
        keyword: '',
    });
    const { news } = useNews(criteria);
    const [source, setSource] = useState<DataSource>(DataSource.newsapi);
    const { categories } = useCategories(source);
    const [author, setAuthor] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        if (user) {
            const { source, author, category } = criteria;
            setCriteria({
                ...criteria,
                source: user.preferences?.source || source,
                author: user.preferences?.author || author,
                category: user.preferences?.category || category,
            });
            setAuthor(user.preferences?.author || author || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        categories[0] && setCriteria({
            ...criteria,
            category: categories[0].id,
            source,
            author,
            keyword,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

    const fetchNews = () => {
        setCriteria({
            ...criteria,
            source,
            author,
            keyword,
        });
    }

    const handleEnter = (event: any) => {
        if (event.key === 'Enter') {
            fetchNews();
        }
    };

    return (
        <>
            <h2>News</h2>

            <Navigation />

            <div className="flex flex-col gap-5 items-center">
                Data Source
                <select
                    className="border"
                    value={source}
                    onChange={(e) => {
                        setSource(e.target.value as any);
                    }}>
                    <option value={DataSource.newsapi}>NewsAPI</option>
                    <option value={DataSource.guardian}>The Guardian</option>
                    <option value={DataSource.nytimes}>New York Times</option>
                </select>

                Category
                <select
                    className="border"
                    value={criteria.category}
                    onChange={(e) => {
                        setCriteria({
                            ...criteria,
                            category: e.target.value,
                            source,
                            author,
                            keyword,
                        });
                    }}
                >
                    {categories.map((category: Category, index: number) => (
                        <option key={`category${index}`} value={category.id}>{category.name}</option>
                    ))}
                </select>

                Author
                <input
                    className="border"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    onKeyPress={handleEnter}
                />

                Keyword
                <input
                    className="border"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={handleEnter}
                />

                <button className="border" onClick={fetchNews}>Fetch</button>
            </div>

            <div>
                {criteria.source === DataSource.guardian && news?.response?.results && <div>
                    {news.response.results.map((item: any, index: number) => (
                        <div key={`guardian${index}`}>
                            {index + 1}. <a href={item.webUrl} target="_blank" rel="noreferrer">
                                {item.webTitle}
                            </a>
                        </div>
                    ))}
                </div>}
                {criteria.source === DataSource.newsapi && news?.articles && <div>
                    {news.articles.map((item: any, index: number) => (
                        <div key={`newsapi${index}`}>
                            {index + 1}. <a href={item.url} target="_blank" rel="noreferrer">
                                {item.title}
                            </a>
                        </div>
                    ))}
                </div>}
                {criteria.source === DataSource.nytimes && news?.response?.docs && <div>
                    {news.response.docs.map((item: any, index: number) => (
                        <div key={`newsapi${index}`}>
                            {index + 1}. <a href={item.web_url} target="_blank" rel="noreferrer">
                                {item.lead_paragraph}
                            </a>
                        </div>
                    ))}
                </div>}
            </div>
        </>
    )
}