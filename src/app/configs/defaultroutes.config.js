import createInjectable from "helpers/createinjectable";

const deps = [
    "$routeProvider",
    "$locationProvider",
];

export default createInjectable(deps, function() {
    //  Enable html 5 URLs
    this.$locationProvider.html5Mode(true);

    //  Set the default routes
    this.$routeProvider
        .when("/", {
            redirectTo: "/photoframe",
        })
        .when("/404", {
            template: "Not found!",
        })
        .otherwise("/404");
});