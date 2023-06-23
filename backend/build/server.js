"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_errors_1 = __importDefault(require("http-errors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", (req, res, next) => {
    res.send("Pet Logger Backend");
});
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
//error handling
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
};
app.use(errorHandler);
//run server
const PORT = 1001;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
