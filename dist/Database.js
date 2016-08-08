"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mongo = require('mongodb');
class Database {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db)
                return this.db;
            return yield new Promise((resolve, reject) => {
                mongo.MongoClient.connect(this.uri, (err, db) => {
                    if (err)
                        return reject(err);
                    this.db = db;
                    return resolve(this.db);
                });
            });
        });
    }
    static setUri(uri) {
        this.uri = uri;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Database;
