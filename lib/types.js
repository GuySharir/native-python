"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.InputType = void 0;
exports.InputType = {
    Param: 'Param',
    File: 'File'
};
var Input = /** @class */ (function () {
    function Input(data, valid) {
        if (valid === void 0) { valid = true; }
        this.data = data;
        this.valid = valid;
    }
    return Input;
}());
exports.Input = Input;
