import createInjectable from "helpers/createinjectable";

const deps = [
    "$routeProvider",
];

export default createInjectable(deps, function() {
    //  Set the default routes
    this.$routeProvider
        .when("/photoframe", {
            template: "<peek-a-boo></peek-a-boo>",
        })
        .when("/piratenick", {
            template: "<peek-a-boo></peek-a-boo>",
        })
        .when("/flyairnick", {
            template: "<peek-a-boo></peek-a-boo>",
        })
        .otherwise("/404");
});