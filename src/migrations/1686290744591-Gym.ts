import { MigrationInterface, QueryRunner } from 'typeorm';

export class Gym1686290744591 implements MigrationInterface {
  name = 'Gym1686290744591';

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
      'business_hours',
      `CREATE TABLE "business_hours" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modified_at" TIMESTAMP WITH TIME ZONE, "day" integer NOT NULL, "open_time" TIME NOT NULL, "close_time" TIME NOT NULL, "time_zone" character varying NOT NULL, "gymId" integer, CONSTRAINT "PK_560a76077605005da835fe505a5" PRIMARY KEY ("id"))`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'gyms',
      `CREATE TABLE "gyms" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modified_at" TIMESTAMP WITH TIME ZONE, "firebase_uuid" character varying(100) NOT NULL, "phone_number" character varying(50) NOT NULL, "owner_name" character varying, "owner_email" character varying(100), "owner_phone_number" character varying(50), "business_name" character varying, "business_email" character varying(100), "business_address" character varying, "business_contact" character varying, "communication_address" character varying, "photos" character varying, "category" integer, "description" character varying, "step_name" character varying, "waiver" character varying, "stripe_account_id" character varying, "google_business_profile" character varying, "registrationMode" integer, CONSTRAINT "PK_fe765086496cf3c8475652cddcb" PRIMARY KEY ("id"))`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'amenities',
      `CREATE TABLE "amenities" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modified_at" TIMESTAMP WITH TIME ZONE, "order_id" integer NOT NULL, "name" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_c0777308847b3556086f2fb233e" PRIMARY KEY ("id"))`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'gyms_amenities_amenities',
      `CREATE TABLE "gyms_amenities_amenities" ("gymsId" integer NOT NULL, "amenitiesId" integer NOT NULL, CONSTRAINT "PK_9b80ee6d47e7beff839167d2424" PRIMARY KEY ("gymsId", "amenitiesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe5c40f4ad25c01b2af1684dc6" ON "gyms_amenities_amenities" ("gymsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be28ca1b33cf3ba9911a65fcfa" ON "gyms_amenities_amenities" ("amenitiesId") `,
    );

    await this.createTableIfNotExists(
      queryRunner,
      'users',
      `ALTER TABLE "users" ALTER COLUMN "experience_level" DROP NOT NULL`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'users',
      `ALTER TABLE "users" ALTER COLUMN "experience_level" DROP DEFAULT`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'users',
      `ALTER TABLE "users" ALTER COLUMN "step_name" DROP NOT NULL`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'users',
      `ALTER TABLE "users" ALTER COLUMN "step_name" DROP DEFAULT`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'business_hours',
      `ALTER TABLE "business_hours" ADD CONSTRAINT "FK_6a78b6d0931956683a880e0c77e" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'gyms_amenities_amenities',
      `ALTER TABLE "gyms_amenities_amenities" ADD CONSTRAINT "FK_fe5c40f4ad25c01b2af1684dc6a" FOREIGN KEY ("gymsId") REFERENCES "gyms"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await this.createTableIfNotExists(
      queryRunner,
      'gyms_amenities_amenities',
      `ALTER TABLE "gyms_amenities_amenities" ADD CONSTRAINT "FK_be28ca1b33cf3ba9911a65fcfa7" FOREIGN KEY ("amenitiesId") REFERENCES "amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gyms_amenities_amenities" DROP CONSTRAINT "FK_be28ca1b33cf3ba9911a65fcfa7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gyms_amenities_amenities" DROP CONSTRAINT "FK_fe5c40f4ad25c01b2af1684dc6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_fitness_categories" DROP CONSTRAINT "FK_2bb1a475dcc83ef7f1106fdd6bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_fitness_categories" DROP CONSTRAINT "FK_9ebe479fc8e43e7557ef1926c12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_hours" DROP CONSTRAINT "FK_6a78b6d0931956683a880e0c77e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "step_name" SET DEFAULT 'None'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "step_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "experience_level" SET DEFAULT 'None'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "experience_level" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fitness_subcategory" DROP COLUMN "category_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_be28ca1b33cf3ba9911a65fcfa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe5c40f4ad25c01b2af1684dc6"`,
    );
    await queryRunner.query(`DROP TABLE "gyms_amenities_amenities"`);
    await queryRunner.query(`DROP TABLE "amenities"`);
    await queryRunner.query(`DROP TABLE "gyms"`);
    await queryRunner.query(`DROP TABLE "business_hours"`);
  }
}
