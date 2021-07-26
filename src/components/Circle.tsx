import React, { useState, useRef } from 'react'

const Circle = () => {
    const circleRef = useRef(null)
    const [ isShowCircle, setShowCircle ] = useState(false)
    const [ isShowMsg, setShowMsg ] = useState(false)

    const showCircle = () => {
        setShowCircle(!isShowCircle)
        const circleElem = circleRef.current as any
        setTimeout(() => {
            circleElem && circleElem.addEventListener('transitionend', function handler(){
                circleElem.removeEventListener('transitionend', handler)
                setShowMsg(!isShowMsg)
            })
        }, 0)
    }

    return (
        <div className="counter_box">
            <h4> Draw a circle </h4>
            <div className="flex_box">
                <div className="flex_0">
                    <div className={`circle_sm ${ !!isShowCircle && "circle_lg"} ${ !!isShowMsg && "circle_message"}`} ref={circleRef}>
                        {!!isShowMsg && !!isShowCircle && "Hello, my girl."}
                    </div>
                </div>
                <div className="flex_1">
                    <div className="btn" onClick={() => { showCircle() }}>click me</div>
                </div>
            </div>
        </div>
    )
}

export default Circle