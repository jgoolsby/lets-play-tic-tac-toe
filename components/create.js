import { useEffect } from "react";
import { useRouter } from 'next/router';

function create() {

    const router = useRouter();

    const pause = () => {

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push({ pathname: '/multiplayer' })
        }, 2100);
        return () => clearTimeout(timer);



    }, [])

    return (
        <div>
            <h1 className="blinkme">Creating Game...</h1>
        </div>
    )
}

export default create
