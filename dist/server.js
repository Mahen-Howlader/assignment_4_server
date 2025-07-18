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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const port = config_1.default.port;
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!config_1.default.database_url) {
                throw new Error("Database URL not found!");
            }
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log("Mongodb conected");
            server = app_1.app.listen(port, () => {
                console.log(`Example app listening on port ${port}`);
            });
        }
        catch (error) {
            console.error(`Server error ${error}`);
        }
    });
}
main();
