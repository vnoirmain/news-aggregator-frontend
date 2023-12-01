import axios from "axios";
import { useAuth } from "hooks/useAuth";
import { useCategories } from "hooks/useCategories";
import Navigation from "components/Navigation";
import { useEffect, useState } from "react";
import { Category } from "types/Category";
import { DataSource } from "types/DataSource";

export default function Dashboard() {
    const { user, setUser } = useAuth();
    const [source, setSource] = useState<DataSource>(DataSource.newsapi);
    const [category, setCategory] = useState<string>('');
    const { categories } = useCategories(source);
    const [author, setAuthor] = useState('');

    useEffect(() => {
        console.log(user);
        if (user && user.preferences) {
            setSource(user.preferences.source || DataSource.newsapi);
            setAuthor(user.preferences.author || '');
            setCategory(user.preferences.category || '');
        }
    }, [user]);

    console.log(categories);

    const save = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/preferences`, {
                source,
                category: category || undefined,
                author: author || undefined,
            });

            user && setUser({
                ...user,
                preferences: {
                    source,
                    category: category || undefined,
                    author: author || undefined,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h2>User Preferences</h2>

            <Navigation />

            <div className="flex flex-col gap-5 items-center">
                Data Source
                <select
                    className="border"
                    value={source}
                    onChange={(e) => {
                        setSource(e.target.value as any);
                        setCategory('');
                    }}>
                    <option value={DataSource.newsapi}>NewsAPI</option>
                    <option value={DataSource.guardian}>The Guardian</option>
                    <option value={DataSource.nytimes}>New York Times</option>
                </select>

                Category
                <select
                    className="border"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                />

                <button className="border" onClick={save}>Save</button>
            </div>
        </>
    )
}