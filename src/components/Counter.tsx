import React, { useState } from 'react'
import './style.css'

const Counter = () => {
    const [ count, setCount ] = useState(0)

    return (
        <div className="counter_box">
            <h4> useState 的用法</h4>
            <div className="flex_box">
                <div className="flex_0">
                    <h3>{count}</h3>
                </div>
                <div className="flex_1">
                    <div className="btn" onClick={() => { setCount(count + 1) }}>click me</div>
                </div>
            </div>
        </div>
    )
}

export default Counter