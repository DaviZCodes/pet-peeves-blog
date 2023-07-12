"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
//setting up the app
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://pet-peeves-blog.vercel.app",
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
//running the server
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`Pet Logger Backend at ${PORT}`);
});
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on("error", (error) => {
    console.log(error);
});
app.use("/", (0, router_1.default)());
app.use("/uploads", express_1.default.static("uploads"));
// Export the Express API
module.exports = app;
//# sourceMappingURL=server.js.map