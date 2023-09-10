const WebSocket = require('ws');

const getParams = (url, param) => new URLSearchParams(new URL(url).search).get(param);

class GlobalWebSocket {
    wss = null;
    ws = null;
    clients = new Map();
    userId = null;
    init() {
        this.wss = new WebSocket.Server({ port: 9001 })
        this.wss.on('connection', (ws, request) => {
            console.log('收到了ws连接请求', request.url)
            const url = request.headers.origin + request.url;
            const userId = getParams(url, 'userId');
            console.log(userId, 'userId')
            if (userId) {
                this.userId = Number(userId);
                this.clients.set(this.userId, ws);
                this.ws = ws;
                this.ws.on('message', this.handleMessage);
                this.ws.on('close', this.handleClose);
                console.log('WebSocket 连接已建立');
            } 
        })
    }
    handleMessage(message) {
        const clientMessage = JSON.parse(message);
        this.ws.send(`服务器回复：${clientMessage}`)
    }
    handleClose() {
        console.log('client disconnected');
        const client = this.clients?.has(this.userId);
        if (client) {
            this.clients.delete(this.userId)
        }
    }
    broadCast(message) {
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
    }
    sendToClient(userId, message) {
        const client = this.clients.get(userId);
        if (client) {
            client.send(JSON.stringify(message))
        }
    }
}

module.exports = new GlobalWebSocket();