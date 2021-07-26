import React, { useState } from 'react'
import SubCounter from './SubCounter'

const Counter = () => {
    const [ count, setCount ] = useState({a: 1, b: 1})

    return (
        <div className="counter_box">
            <h4> useState 的用法</h4>
            <div className="flex_box">
                <div className="flex_0">
                    <h3>{count.a}+{count.b}</h3>
                </div>
                <div className="flex_1">
                    <div className="btn" onClick={() => { setCount({a: 1, b: 1}) }}>click me</div>
                </div>
            </div>
            <SubCounter value={"weicome"}/>
        </div>
    )
}

export default Counter