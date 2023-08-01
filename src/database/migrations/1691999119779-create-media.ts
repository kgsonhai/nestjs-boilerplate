import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMedia1691999119779 implements MigrationInterface {
  name = 'CreateMedia1691999119779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`media\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`media\` ADD \`file_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`media\` ADD \`mime_type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`media\` ADD \`size\` int NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`size\``);
    await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`mime_type\``);
    await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`file_name\``);
    await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`name\``);
  }
}
