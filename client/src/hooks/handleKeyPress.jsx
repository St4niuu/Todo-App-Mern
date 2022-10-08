import {useEffect} from 'react'

const handleKeyPress = (callback, key) => {
    useEffect(() => {
        const keyPressHandler = (e) => {
            if(e.key === key) {
                callback()
            }
        }
        window.addEventListener('keydown', keyPressHandler)
        return () => {
            window.removeEventListener('keydown', keyPressHandler)
        }
    }, [callback, key])
}

export default handleKeyPress