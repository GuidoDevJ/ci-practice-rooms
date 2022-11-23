"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = void 0;
const app_1 = require("firebase/compat/app");
require("firebase/compat/database");
const app = app_1.default.initializeApp({
    apiKey: "h8XYAY8RN7ALuqKsqnlneYmczGHlLv0PoJVx7J4u",
    authDomain: "desafio-3-md6.firebaseapp.com",
    databaseURL: "https://desafio-3-md6-default-rtdb.firebaseio.com",
    projectId: "desafio-3-md6",
});
const rtdb = app_1.default.database();
exports.rtdb = rtdb;
