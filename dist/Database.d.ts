import * as mongo from 'mongodb';
export default class Database {
    private static db;
    private static uri;
    static connect(): Promise<mongo.Db>;
    static setUri(uri: string): void;
}
