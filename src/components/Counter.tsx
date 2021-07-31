import React, { useState, useCallback, useMemo } from 'react'
import SubCounter from './SubCounter'

const Counter = () => {
    const [ count, setCount ] = useState(0)
    const [ name, setName ] = useState("hhhh")

    const lazy = () => {
        setTimeout(() => {
            console.log("count===", count)
            setCount(count + 1)
            // setCount((count) => {
            //     console.log("count=====", count)
            //     return count + 1
            // })
        }, 3000)
    }

    const handleChangeName = (e: any) => {
        setName(e.target.value)
    }

    const addClick = useCallback(() => {
        setCount(count+1)
    }, [count])

    const data = useMemo(() => ({count}), [count])

    return (
        <div className="counter_box">
            <h4> useState 的用法</h4>
            <div className="flex_box">
                <div className="flex_0">
                    <h3>{count} - {name}</h3>
                    <input onChange={handleChangeName} value={name}/>
                </div>
                <div className="flex_1">
                    <div className="btn" onClick={() => { setCount(count + 1) }}>add count</div>
                    <div className="btn" onClick={lazy}>lazy</div>
                </div>
            </div>
            <SubCounter value={data} onClick={addClick}/>
        </div>
    )
}

export default Counter