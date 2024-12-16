import { useState, useEffect } from "react";

function useWikipedia(query) {
    const [data, setData] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWikipediaIntro = async () => {
            const url = "https://es.wikipedia.org/w/api.php";

            const params = {
                action: "query",
                format: "json",
                titles: query,
                prop: "extracts",
                exintro: true,
                explaintext: true,
                origin: "*",
            };

            const queryString = new URLSearchParams(params).toString();

            try {
                const response = await fetch(`${url}?${queryString}`);
                const result = await response.json();

                const page = Object.values(result.query.pages)[0];
                const name = Object.values(result.query.normalized)[0].to;
                if (page.extract) {
                    let extract = page.extract.replace(/\[\d+\]/g, ""); // Limpia los números de referencia
                    extract = extract.trimEnd(); // Elimina los espacios en blanco al final
                    if (!extract.endsWith('.')) {
                        extract += '.';
                    }
                    setData(extract); // Guarda el texto introductorio limpio
                    setName(name);
                } else {
                    setError("No se encontró información.");
                }
            } catch (err) {
                setError("Error al conectar con la API.");
            } finally {
                setLoading(false); // Detén el estado de carga
            }
        };

        fetchWikipediaIntro();
    }, [query]);

    return { data, loading, error, name };
};

export default useWikipedia;
