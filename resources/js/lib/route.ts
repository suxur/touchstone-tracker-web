import ZiggyRoute, { RouteParamsWithQueryOverload } from 'ziggy-js';
import { Ziggy } from '../ziggy';

const route = (name: string, params?: RouteParamsWithQueryOverload, absolute?: boolean) => ZiggyRoute(name, params, absolute, Ziggy);

export default route;
