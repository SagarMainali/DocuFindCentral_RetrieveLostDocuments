import { useEffect, useState } from "react";

export default function useFetchTickets(path: string) {

    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSolvedTickets = async () => {
            try {
                const responseObj = await fetch(path);
                if (responseObj.ok) {
                    const parsedData = await responseObj.json();
                    setTickets(parsedData.reverse());
                }
                else {
                    setError(responseObj.statusText);
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        getSolvedTickets();

    }, [])

    return { tickets, error };
}
