import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Gym1686290744591 implements MigrationInterface {
    name: string;
    createTableIfNotExists: (queryRunner: QueryRunner, tableName: string, query: string) => Promise<void>;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
