export default class Injectable {
    constructor() {
        const args = [...arguments];
        const argNames = this.__proto__.constructor.$inject;

        if (args.length !== argNames.length) {
            throw "Something is wrong. The list of arguments and $inject module names do not match.";
        }

        argNames.forEach((current, index) => {
            this[current] = args[index];
        });
    }
}