import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMedia1706002458966 implements MigrationInterface {
  name = 'CreateTableMedia1706002458966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`media\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`file_name\` varchar(255) NOT NULL, \`mime_type\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`media\` ADD CONSTRAINT \`FK_0db866835bf356d896e1892635d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`media\` DROP FOREIGN KEY \`FK_0db866835bf356d896e1892635d\``,
    );
    await queryRunner.query(`DROP TABLE \`media\``);
  }
}
