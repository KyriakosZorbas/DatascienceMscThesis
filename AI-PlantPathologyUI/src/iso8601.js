(function (b) {
    function f(a, j) {
        var b = j ? j : !1, c = [2, 3, 4, 5, 7, 8, 9], e = [0, 0, 0, 0, 0, 0, 0], f = [0, 12, 4, 7, 24, 60, 60], h;
        if (a = a.toUpperCase()) {
            if ("string" !== typeof a) throw Error("Invalid iso8601 period string '" + a + "'");
        } else return e;
        if (h = /^P((\d+Y)?(\d+M)?(\d+W)?(\d+D)?)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.exec(a)) for (var d = 0; d < c.length; d++) {
            var k = c[d];
            e[d] = h[k] ? +h[k].replace(/[A-Za-z]+/g, "") : 0
        } else throw Error("String '" + a + "' is not a valid ISO8601 period.");
        if (b) for (d = e.length - 1; 0 < d; d--) e[d] >= f[d] && (e[d - 1] += Math.floor(e[d] /
            f[d]), e[d] %= f[d]);
        return e
    }

    b.iso8601 || (b.iso8601 = {});
    b.iso8601.Period || (b.iso8601.Period = {});
    b.iso8601.version = "0.2";
    b.iso8601.Period.parse = function (a, b) {
        return f(a, b)
    };
    b.iso8601.Period.parseToTotalSeconds = function (a) {
        var b = [31104E3, 2592E3, 604800, 86400, 3600, 60, 1];
        a = f(a);
        for (var g = 0, c = 0; c < a.length; c++) g += a[c] * b[c];
        return g
    };
    b.iso8601.Period.isValid = function (a) {
        try {
            return f(a), !0
        } catch (b) {
            return !1
        }
    };
    b.iso8601.Period.parseToString = function (a, b, g, c) {
        var e = "      ".split(" ");
        a = f(a, c);
        b || (b = "year month week day hour minute second".split(" "));
        g || (g = "years months weeks days hours minutes seconds".split(" "));
        for (c = 0; c < a.length; c++) 0 < a[c] && (e[c] = 1 == a[c] ? a[c] + " " + b[c] : a[c] + " " + g[c]);
        return e.join(" ").trim().replace(/[ ]{2,}/g, " ")
    }
})(window.nezasa = window.nezasa || {});