import React from 'react'
import './components/style.css'
import Counter from './components/Counter'
import Circle from './components/Circle'
import Jsonp from './components/Jsonp'
import MyFetch from './components/MyFetch'
import LayoutEffect from './components/LayoutEffect'

interface IProps {
    name: string,
    age: number
}

export default function App(props: IProps){
    const { name, age } = props
    return <div>
        <h3>{`Hello, I'm ${name}, ${age} years old.`}</h3>
        <LayoutEffect />
        <Counter/>
        <Circle />
        <Jsonp />
        <MyFetch />
    </div>
}