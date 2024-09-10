import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGoogleIdToUsers1725352275721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "googleId" character varying`,
    );
    await queryRunner.query(
      `UPDATE "users" SET "googleId" = '' WHERE "googleId" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "googleId" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "googleId"`);
  }
}
