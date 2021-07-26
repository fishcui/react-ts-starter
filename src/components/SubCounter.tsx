import React from 'react'

const SubCounter = (props : any) => {
    console.log("sub render...")
    return (
        <h4>{props.value}</h4>
    )
}

export default SubCounter