import {InversifyKoaServer} from "inversify-koa-utils";
import {Container} from "./ioc/ioc";

const container = new Container();
//如何加载资源
container.load();
let server = new InversifyKoaServer(container);
server.setConfig(app=>{
    //静态资源
}).setErrorConfig(app=>{
    //容错
});

let app = server.build();
app.listen(3000,()=>{
    console.log("一灯Inversify启动成功🍺");
});