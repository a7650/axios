"use strict";
exports.__esModule = true;
var InterceptorManager = /** @class */ (function () {
    function InterceptorManager() {
        this.interceptors = [];
    }
    InterceptorManager.prototype.use = function (resolved, rejected) {
        this.interceptors.push({
            resolved: resolved,
            rejected: rejected
        });
        return this.interceptors.length - 1;
    };
    InterceptorManager.prototype.forEach = function (fn) {
        this.interceptors.forEach(function (Interceptor) {
            if (Interceptor !== null) {
                fn(Interceptor);
            }
        });
    };
    InterceptorManager.prototype.eject = function (id) {
        if (this.interceptors) {
            this.interceptors[id] = null;
        }
    };
    return InterceptorManager;
}());
exports["default"] = InterceptorManager;
