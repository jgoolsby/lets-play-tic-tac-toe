import { useEffect } from "react";
import { useRouter } from 'next/router';

function Search() {

    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            // router.push({ pathname: '/multiplayer' })
        }, 2100);
        return () => clearTimeout(timer);



    }, [])

    return (
        <div>
            <h1 className="blinkme">Searching for Game...</h1>
        </div>
    )
}

export default Search

