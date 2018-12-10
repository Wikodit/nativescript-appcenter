var Appcenter = require("nativescript-appcenter").Appcenter;
var appcenter = new Appcenter();

describe("greet function", function() {
    it("exists", function() {
        expect(appcenter.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(appcenter.greet()).toEqual("Hello, NS");
    });
});