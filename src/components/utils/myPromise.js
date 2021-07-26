
// Promise.allSettled = (promises) => {
//     const resolveHandler = (data) => {
//         return {status: 'fulfilled', value: data}
//     }
//     const rejectHandler = (error) => {
//         return {status: 'failed', value: error}
//     }
//     const convertPromises = promises.map(promise => {
//         return Promise.resolve(promise).then(resolveHandler, rejectHandler)
//     })

//     let ret = Promise.all(convertPromises)
//     return ret
// }
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise{
    constructor(fn){
        this.status = PENDING
        this.fulfilledCallbacks = []
        this.rejectedCallbacks = []
        this.value = null
        this.error = null
        fn(this._resolve.bind(this), this._reject.bind(this))
    }

    then(onFulfilled, onRejected){
        let self = this
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : error => error

        if(this.status === PENDING){
            return new MyPromise((resolve, reject) => {
                self.fulfilledCallbacks.push((value) => {
                    try {
                        let x = onFulfilled(value)
                        self._resolvePromise(x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
                self.rejectedCallbacks.push((error) => {
                    try {
                        let x = onRejected(error)
                        self._resolvePromise(x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    } 
                })
            })
        }else if(self.status === FULFILLED){
            return new MyPromise((resolve, reject) => {
                try {
                    let x = onFulfilled(self.value)
                    self._resolvePromise(x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }else if(this.status === REJECTED){
            return new Promise((resolve, reject) => {
                try {
                    let x = onRejected(self.error)
                    self._resolvePromise(x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
    }

    _resolve(value){
        this.status = FULFILLED
        this.value = value
        this.fulfilledCallbacks.forEach(callback => {
            callback(this.value)
        })
    }

    _reject(error){
        this.status = REJECTED
        this.error = error
        this.rejectedCallbacks.forEach(callback => {
            callback(this.error)
        })
    }

    _resolvePromise(x, resolve, reject){
        if(x instanceof MyPromise){
            if(x.status === PENDING){
                x.then(y => {
                    this._resolvePromise(y, resolve, reject)
                }, error => {
                    reject(error)
                })
            }else{
                x.then(resolve, reject)
            }
        }else{
            resolve(x)
        }
    }

    static resolve = (promise) => {
        if(promise instanceof MyPromise){
            return promise
        }else{
            return new MyPromise((resolve, reject) => {
                resolve(promise)
            })
        }
    }

    static all = (promises) => {
        return new MyPromise((resolve, reject) => {
            let result = []
            promises.forEach((promise, index) => {
                promise = MyPromise.resolve(promise)
                promise.then(data => {
                    result[index] = data
                    result.length === promises.length && resolve(result)
                }, error => {
                    reject(error)
                })
            })
        })
    }

    static race = (promises) => {
        let result = []
        let p =  new MyPromise((resolve, reject) => {
            for(let i=0; i<promises.length;i++){
                let promise = promises[i]
                promise = MyPromise.resolve(promise)
                promise.then(data => {
                    result.push(data)
                    result.length === 1 && resolve(...result)
                }, error => {
                    reject(error)
                })
            }
        })
        return p
    }
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p1")
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("p2")
    }, 1000)
})

let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p3")
    }, 1000)
})

let ret = [p1,p2,p3].map((p) => {
    p = p.catch(error => error)
    return p
})

let p = Promise.all(ret)

p.then((data) => {
    console.log("data", data)
}, error => {
    console.log("error", error)
})




