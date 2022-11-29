"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFunction = exports.InputType = void 0;
var server_js_1 = require("./lib/server.js");
var types_js_1 = require("./lib/types.js");
var parseInput_js_1 = require("./lib/parseInput.js");
var types_js_2 = require("./lib/types.js");
Object.defineProperty(exports, "InputType", { enumerable: true, get: function () { return types_js_2.InputType; } });
/**
 * @param fullPath The full path to the python module.
 * example: fullPath = /path/to/python/module.py
 *
 * @param functionName the name of the function to call from the module.
 * example: module.py contains the name of the function 'foo'
 * functionName = foo
 *
 * @param inputType the type of input provided, default is InputType.Param defined in InputType object exported from this module.
 * example: inputType = InputType.File
 * if inputType is file then the input will be ignored and the function will use the inputPath instead.
 *
 * @param input array of inputs to pass to the function. the input will be passed to the function by index.
 * example: input = ['foo' , [1,2,3,4], {'bar': 'baz'}] will invoke
 * python_function('foo', [1,2,3,4], {'bar': 'baz'}) accordingly
 *
 * @param inputPath the path to the input file.
 * this is only relevant if inputType == InputType.File.
 * in this case, the input param will be ignored and the file will be used.
 * the file must be a .json file containing an array of inputs by order.
 *
 */
function runFunction(fullPath, functionName, pythonBinaryPath, inputType, input, inputPath, stdout) {
    if (inputType === void 0) { inputType = types_js_1.InputType.Param; }
    if (input === void 0) { input = []; }
    if (inputPath === void 0) { inputPath = ""; }
    if (stdout === void 0) { stdout = true; }
    return __awaiter(this, void 0, void 0, function () {
        var functionInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, parseInput_js_1.parseInput)(inputType, input, inputPath)];
                case 1:
                    functionInput = _a.sent();
                    if (!functionInput.valid) {
                        return [2 /*return*/, "error with the input"];
                    }
                    return [4 /*yield*/, (0, server_js_1.startServer)(fullPath, functionName, pythonBinaryPath, functionInput.data, stdout)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.runFunction = runFunction;
