import Block from './Block';
import { Route } from './Route';

export class Router {
    static __instance: Router;

    public routes: Route[] = [];

    public history: History = window.history;

    private _currentRoute: Route | undefined;

    private _rootQuery: string | undefined = undefined;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = undefined;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery as string });
        this.routes.push(route);
        return this;
    }

    async guard(redirectTo: string, callback: () => boolean | Promise<boolean>) {
        const result = await callback();

        if (!result) {
            this.go(redirectTo);
        }
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            const currentWindow = event.currentTarget as Window;
            this._onRoute(currentWindow.location.pathname as string);
        };

        this._onRoute(window.location.pathname as string);
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);

        if (!route) {
            route = this.getRoute('/error');
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;

        route?.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

export const router = new Router('#app');
