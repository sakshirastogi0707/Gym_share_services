import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Users1686211082764 implements MigrationInterface {
    name: string;
    createTableIfNotExists: (queryRunner: QueryRunner, tableName: string, query: string) => Promise<void>;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
