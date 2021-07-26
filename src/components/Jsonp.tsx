import React, { useState } from 'react'

declare const window : any

const Jsonp = () => {

    const [ result, setResult ] = useState(null)

    function fetchData(){
        jsonp({
            url: 'http://localhost:3000/say',
            params: { wd: 'Iloveyou' },
            callback: 'show'
        }).then(data => {
            setResult(data as any)
        }).catch(error => {
            let msg = 'fetch data failed' as any
            setResult(msg)
        })
    }

    function jsonp({url, params, callback} : any){
        return new Promise((resolve, reject) => {
            let script = document.createElement('script')
            window[callback] = function (data : any){
                resolve(data + "是假的")
                document.body.removeChild(script)
            }
            params = {...params, callback}
            let arrs = []
            for(let key in params){
                arrs.push(`${key}=${params[key]}`)
            }
            script.src = `${url}?${arrs.join("&")}`
            document.body.appendChild(script)
        })
    }

    return (
        <div className="counter_box">
            <h4> JSONP Demo </h4>
            <div className="flex_box">
                <div className="flex_0">
                    {result}
                </div>
                <div className="flex_1">
                    <div className="btn" onClick={() => { fetchData() }}>click me</div>
                </div>
            </div>
        </div>
    )
}

export default Jsonp