// const TELEGRAPH_URL = 'https://api.openai.com';
const inbounds = [

]
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
    const inbound = getInbound(inbound_apikey)
    // 如果不正确，返回401
    if (!inbound) {
        return new Response(null, {
            status: 401,
            statusText: 'Unauthorized'
        })
    }
    // 得到一个完整的URL
    const url = new URL(request.url);

    // 定义循环内所用到的变量
    let outbound;
    let host;
    let apikey;
    let response;
    // 一个修改后的请求
    let modifiedRequest = new Request(url.toString(), {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: 'follow'
    });
    while (true) {
        // 随机选择一个出口
        outbound = getRandomElement(outbounds);
        // 随机获得一个host和key
        host = outbound.host
        apikey = getRandomElement(outbound.apikeys);

        // 修改URL中的Host
        url.host = host;
        modifiedRequest.url = url.toString()
        // 修改请求头
        modifiedRequest.headers.set('Authorization', 'Bearer ' + apikey);

        // 发起请求，得到响应
        response = await fetch(modifiedRequest);
        console.log('inbound[' + inbound.name + '@' + inbound.apikey + ']=>outbound[' + host + '@' + apikey + '] code[' + response.status + ']')
        if (response.status < 400) {
            return response;
        }
    }
}


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getInbound(apiKey) {
    for (let i = 0; i < inbounds.length; i++) {
        if (inbounds[i].apikey === apiKey) {
            return inbounds[i]
        }
    }
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