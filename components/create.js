import { useEffect } from "react"
import { useRouter } from 'next/router'

function create(props) {

    const router = useRouter()

    const pause = () => {

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push({ pathname: '/multiplayer', query: { gc: 'true' } }) // send yes if created true and get on other side
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
