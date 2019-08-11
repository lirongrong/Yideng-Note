import {
    controller,
    interfaces,
    Router,
    httpGet,
    inject,
    provideThrowable,

    TAGS
} from "../ioc/ioc";
// 1. Router.IRouterContext 2.interfaces.Controller 3.@inject(TAGS.IndexService)
@controller("/")
//todo
@provideThrowable(Symbol.for("IndexController"),"IndexController")
export default class IndexController implements interfaces.Controller {
    private indexService;
    constructor(@inject(TAGS.IndexService)indexService) {
        this.indexService = indexService;
    }
    @httpGet("/")
    private async index(ctx : Router.IRouterContext, next : () => Promise <any>) : Promise <any> {
        const result = this.indexService.getUser(1);
        ctx.body = await ctx.render("index");
    }
}
