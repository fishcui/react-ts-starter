import React from 'react'
import './App.css'
import Counter from './components/Counter'

interface IProps {
    name: string,
    age: number
}

export default function App(props: IProps){
    const { name, age } = props
    return <div>
        <h3>{`Hello, I'm ${name}, ${age} years old.`}</h3>
        <Counter/>
    </div>
}