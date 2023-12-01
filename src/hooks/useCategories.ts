import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Category } from "types/Category";
import { DataSource } from "types/DataSource";

export const useCategories = (source: DataSource) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = useCallback(async (source: DataSource) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories?source=${source}`);
            setCategories(source === DataSource.guardian ? data :
                data.map((category: string) => ({
                    id: category,
                    name: category
                }))
            );
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCategories(source);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source]);

    return { categories, loading }
}