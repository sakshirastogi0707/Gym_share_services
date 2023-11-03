import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1686211082764 implements MigrationInterface {
  name = 'Users1686211082764';

  createTableIfNotExists = async (
    queryRunner: QueryRunner,
    tableName: string,
    query: string,
  ) => {
    const tableExists = await queryRunner.hasTable(tableName);

    if (!tableExists) {
      await queryRunner.query(query);
    }
  };

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createTableIfNotExists(
      queryRunner,
      'users',
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modified_at" TIMESTAMP WITH TIME ZONE, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(100), "email_id" character varying(100), "phone_number" character varying(50), "location" text, "profile_pic" character varying, "birth_date" date, "firebase_uuid" character varying(100) NOT NULL, "document_certificate" character varying, "experience_level" character varying, "step_name" character varying, "user_type" integer DEFAULT '300', "medical_history" text, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );

    await this.createTableIfNotExists(
      queryRunner,
      'fitness_subcategory',
      `CREATE TABLE "fitness_subcategory" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modified_at" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "description" character varying(200) NOT NULL, "order_id" integer NOT NULL, "active" boolean NOT NULL, "category_id" integer, CONSTRAINT "PK_fc3af03b6614ed5bb778d5f7059" PRIMARY KEY ("id"))`,
    );

    await this.createTableIfNotExists(
      queryRunner,
      'user_fitness_categories',
      `CREATE TABLE "user_fitness_categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modified_at" TIMESTAMP WITH TIME ZONE, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" integer NOT NULL, "category_id" integer NOT NULL, "subcategory_id" integer NOT NULL, CONSTRAINT "user_category_subcategory_unique_constraint" UNIQUE ("user_id", "category_id", "subcategory_id"), CONSTRAINT "PK_ec00b8ea6b5fe76182b0afd744a" PRIMARY KEY ("id"))`,
    );

    await this.createTableIfNotExists(
      queryRunner,
      'fitness_category',
      `CREATE TABLE "fitness_category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modified_at" TIMESTAMP WITH TIME ZONE, "name" character varying(100), "description" character varying(200), "icon" character varying, "order_id" integer NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_e352c9e77f4f3eae1a0b1a0f5b4" PRIMARY KEY ("id"))`,
    );

    await this.createTableIfNotExists(
      queryRunner,
      'fitness_subcategory',
      `ALTER TABLE "fitness_subcategory" ADD CONSTRAINT "FK_3dd89124748f829c8370ba411b5" FOREIGN KEY ("category_id") REFERENCES "fitness_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await this.createTableIfNotExists(
      queryRunner,
      'user_fitness_categories',
      `ALTER TABLE "user_fitness_categories" ADD CONSTRAINT "FK_a050429c92413e2e8b56d89e21b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await this.createTableIfNotExists(
      queryRunner,
      'user_fitness_categories',
      `ALTER TABLE "user_fitness_categories" ADD CONSTRAINT "FK_9ebe479fc8e43e7557ef1926c12" FOREIGN KEY ("category_id") REFERENCES "fitness_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await this.createTableIfNotExists(
      queryRunner,
      'user_fitness_categories',
      `ALTER TABLE "user_fitness_categories" ADD CONSTRAINT "FK_2bb1a475dcc83ef7f1106fdd6bd" FOREIGN KEY ("subcategory_id") REFERENCES "fitness_subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_fitness_categories" DROP CONSTRAINT "FK_2bb1a475dcc83ef7f1106fdd6bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_fitness_categories" DROP CONSTRAINT "FK_9ebe479fc8e43e7557ef1926c12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_fitness_categories" DROP CONSTRAINT "FK_a050429c92413e2e8b56d89e21b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fitness_subcategory" DROP CONSTRAINT "FK_3dd89124748f829c8370ba411b5"`,
    );
    await queryRunner.query(`DROP TABLE "fitness_category"`);
    await queryRunner.query(`DROP TABLE "user_fitness_categories"`);
    await queryRunner.query(`DROP TABLE "fitness_subcategory"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
