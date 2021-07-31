import React, { useState } from 'react'

declare const window : any

const MyFetch = () => {

    const [ users, setUsers ] = useState([]) as any

    async function fetchData(url : string){
        try {
            let response = await fetch(url)
            if(!!response.ok){
                return await response.json();
            }else{
                return null
            }
        } catch (error) {
            return null
        }

    }

    async function getUsers(names: string[]){
        let fetchPromises = names.map(name => {
            let fetchUrl = 'https://api.github.com/users/' + name
            return fetchData(fetchUrl)
        })
        let ret = await Promise.all(fetchPromises)
        ret = ret.filter(v => !!v)
        let result: string[] = ret.map(v => {
            return v && v.name || ""
        })
        setUsers(result) 
    }

    return (
        <div className="counter_box">
            <h4> 从 GitHub fetch 用户信息 </h4>
            <div className="flex_box">
                <div className="flex_0">
                    <p>{users.join(",")}</p>
                </div>
                <div className="flex_1">
                    <div className="btn" onClick={() => { getUsers(['iliakan', 'remy', 'no.such.users']) }}>确定</div>
                </div>
            </div>
        </div>
    )
}

export default MyFetch