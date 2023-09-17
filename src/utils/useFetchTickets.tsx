import { useEffect, useState } from "react";
import { FormDataType } from "../types/globalTypes";

export default function useFetchTickets(path: string) {

    const [tickets, setTickets] = useState<FormDataType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSolvedTickets = async () => {
            try {
                const responseObj = await fetch(path);
                if (responseObj.ok) {
                    const parsedData = await responseObj.json();
                    setTickets(parsedData);
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

    }, [path])

    return { tickets, error };
}
