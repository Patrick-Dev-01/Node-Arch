import http from 'http2';
import crypto from 'crypto';

const app = http.createServer();
const teste = crypto.randomUUID();

app.listen(3000, () => console.log(teste));