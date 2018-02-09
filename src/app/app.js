import "app.style.less";
import angular from "angular";
import ngRoute from "angular-route";
import "angular-location-update";
import defaultRoutes from "configs/defaultroutes.config";
import peekABoo from "modules/peekaboo/peekaboo.module";

const deps = [
    ngRoute,
    "ngLocationUpdate",
    peekABoo,
];

const APP_NAME = "nicholasboettcher.com";

angular.module(APP_NAME, deps)
       .config(defaultRoutes);

export default APP_NAME;