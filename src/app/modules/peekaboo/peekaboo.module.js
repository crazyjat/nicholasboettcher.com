import angular from "angular";
import routes from "./configs/peekaboo.routes.config";
import peekABoo from "./components/peekaboo/peekaboo.component";

const deps = [];

const MODULE_NAME = "peekaboo";

angular.module(MODULE_NAME, deps)
       .config(routes)
       .component(peekABoo.name, peekABoo);

export default MODULE_NAME;