import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSessionTable1780925483966 implements MigrationInterface {
    name = 'AddedSessionTable1780925483966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sessions_device_type_enum" AS ENUM('web', 'mobile', 'tablet', 'desktop')`);
        await queryRunner.query(`CREATE TYPE "public"."sessions_status_enum" AS ENUM('active', 'revoked', 'expired')`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL, "version" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "device_fingerprint" character varying(255) NOT NULL, "device_type" "public"."sessions_device_type_enum" NOT NULL DEFAULT 'desktop', "device_name" character varying(100), "ip_address" character varying(45) NOT NULL, "user_agent" text NOT NULL, "status" "public"."sessions_status_enum" NOT NULL DEFAULT 'active', "last_activity_at" TIMESTAMP WITH TIME ZONE, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "revoked_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_085d540d9f418cfbdc7bd55bb1" ON "sessions"  ("user_id") `);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_085d540d9f418cfbdc7bd55bb1"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TYPE "public"."sessions_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."sessions_device_type_enum"`);
    }

}
