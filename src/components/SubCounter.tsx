import React, {memo} from 'react'

const SubCounter = ({value, onClick} : any) => {
    console.log("sub render...", value)
    return (
        <div>
            <h4>{value.count}</h4>
            <div className="btn" onClick={onClick}>SubCounter add</div>
        </div>
    )
}

export default memo(SubCounter)