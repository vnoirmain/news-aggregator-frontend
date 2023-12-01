import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Criteria } from "types/Criteria";

export const useNews = (criteria: Criteria) => {
    const [news, setNews] = useState<any>();
    const [loading, setLoading] = useState(false);

    const fetchNews = useCallback(async (criteria: Criteria) => {
        if (!criteria.category) return;
        setLoading(true);
        try {
            const params = Object.keys(criteria).map(key => {
                // @ts-ignore
                const value = criteria[key];
                return value ? `${key}=${value}` : '';
            }).filter(q => q).join('&');
            // console.log(params);
            const { data: {news} } = await axios.get(`${process.env.REACT_APP_API_URL}/api/news?${params}`);
            if (news) {
                setNews(news);
            }
            // console.log(news);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchNews(criteria);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [criteria]);

    return { news, loading }
}