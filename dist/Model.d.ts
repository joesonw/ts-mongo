import 'reflect-metadata';
export default class Model {
    __collection__: string;
    __schema__: {
        [key: string]: any;
    };
    toJSON(): {
        [key: string]: any;
    };
    save(): Promise<void>;
    remove(): Promise<void>;
}
export declare function fromDb<T extends Model>(model: new () => T, data: any): T;
export declare function Field<T extends Model>(prototype: T, key: string): void;
export declare function ArrayField<T extends Model>(embedType: any): (prototype: T, key: string) => void;
export declare function Collection(name: string): <T extends Model>(target: new () => T) => void;
