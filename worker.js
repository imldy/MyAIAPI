// const TELEGRAPH_URL = 'https://api.openai.com';

const outbounds = [

]

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

// 处理请求
async function handleRequest(request) {
    // 获取传入得apikey
    const inbound_apikey = getApiKey(request.headers)

    // todo: 判断传入的apikey是否正确

    // 如果正确

    // 得到一个完整的URL
    const url = new URL(request.url);

    // 定义循环内所用到的变量
    let outbound;
    let host;
    let apikey;
    let headers;
    let modifiedRequest;
    let response;
    const requestClone = request.clone()
    while (true) {
        // 随机选择一个出口
        outbound = getRandomElement(outbounds);
        // 随机获得一个host和key
        host = outbound.host
        apikey = getRandomElement(outbound.apikeys);

        // 修改URL中的Host
        url.host = host;
        // 修改请求头
        headers = new Headers(requestClone.headers);
        headers.set('Authorization', 'Bearer ' + apikey);

        // 一个修改后的请求
        modifiedRequest = new Request(url.toString(), {
            headers: headers,
            method: requestClone.method,
            body: requestClone.body,
            redirect: 'follow'
        });
        // 发起请求，得到响应
        response = await fetch(modifiedRequest);
        console.log('inbound_apikey[' + inbound_apikey + ']=>outbound[' + host + '@' + apikey + '] code[' + response.status + ']')
        if (response.status < 400) {
            return response;
        }
    }
}


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getApiKey(headers) {
    const authHeader = headers.get('Authorization');
    let inbound_apikey = 'null';
    if (!authHeader) {
        // handle missing authorization header
    } else {
        inbound_apikey = authHeader.replace("Bearer ", "");
        // continue with the rest of your code
    }
    return inbound_apikey;
}