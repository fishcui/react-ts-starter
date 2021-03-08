import React from 'react'

interface IProps {
    name: string,
    age: number
}

export default function App(props: IProps){
    const { name, age } = props
    return <div className='App'>
        <h1>{`Hello, I'm ${name}, ${age} years old.`}</h1>
    </div>
}