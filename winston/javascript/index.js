import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "./routes";

Fort.routes = routes;
Fort.folders = [{
    alias: "/",
    path: path.join(__dirname, "../static")
}];
Fort.create().then(() => {
    Fort.logger.debug("Your fort is located at address - localhost:4000");
}).catch(err => {
    console.error(err);
})