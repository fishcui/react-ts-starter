import React, { useState } from 'react'

declare const window : any

const Jsonp = () => {

    const [ result, setResult ] = useState(null) as any

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

    async function fetchData3(){
        let user = {
            name: 'John',
            surname: 'Smith'
          };
        let response = await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        if(!!response.ok){
            let ret = await response.json();
            console.log("ret===", ret)
            setResult(JSON.stringify(ret))
        }

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
            <h4> 跨域解决方案 </h4>
            <div className="flex_box">
                <div className="flex_0">
                    <p>{result}</p>
                </div>
                <div className="flex_1">
                    <div className="btn" onClick={() => { fetchData() }}>JSONP 跨域</div>
                    <div className="btn" onClick={() => { fetchData() }}>CORS 跨域</div>
                    <div className="btn" onClick={() => { fetchData3() }}>Node 代理服务器</div>
                </div>
            </div>
        </div>
    )
}

export default Jsonp