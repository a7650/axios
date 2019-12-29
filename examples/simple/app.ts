import axios from '../../src/index'
import { AxiosError } from '../../src/types/index'

axios({
    method: 'post',
    url: '/simple/post',
    data: {
        a: 1,
        b: 2
    },
    responseType: "json",
    timeout: 5000
}).then(res => {
    console.log(res)
}).catch((err: AxiosError) => {
    console.log(err)
})
// axios({
//     method: 'get',
//     url: '/simple/get?base=BASE#hash',
//     params: {
//         array: ['a', 'b', 'c'],
//         date: new Date(),
//         object: {
//             a: 1,
//             b: 2
//         }
//     }
// })