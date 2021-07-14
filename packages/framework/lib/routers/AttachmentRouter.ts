interface IRoutes {
    [key: string]: (...args: any[]) => any;
}

/**
 * A Basic Router Class
 */
export default class AttachmentRouter {
    private routes: IRoutes = {};
    /**
     * Adds routes to this router
     */
    public importRoutes(routes = {}): void {
        this.routes = Object.assign(routes, this.routes);
    }

    /**
     * Checks if the route exists and if yes returns the function. If it doesn't exist it returns false
     */
    public getRoute(route: string): ((...args: any[]) => any) | false {
        if (route in this.routes) {
            return this.routes[route];
        }

        return false;
    }
}
