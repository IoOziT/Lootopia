-- CreateEnum
CREATE TYPE "mode_enum" AS ENUM ('PUBLIC', 'PRIVE');

-- CreateEnum
CREATE TYPE "monde_enum" AS ENUM ('CARTOGRAPHIQUE', 'REEL');

-- CreateEnum
CREATE TYPE "role_enum" AS ENUM ('COMMUN', 'PARTENAIRE');

-- CreateEnum
CREATE TYPE "style_enum" AS ENUM ('RETRO', 'MODERNE');

-- CreateEnum
CREATE TYPE "type_clef_enum" AS ENUM ('DECOUVERTE', 'PASSPHRASE', 'REPERE');

-- CreateEnum
CREATE TYPE "type_recompense_enum" AS ENUM ('COURONNE', 'CARTE_COLLECTION', 'EXTERNE');

-- CreateTable
CREATE TABLE "cache" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(45) NOT NULL,
    "style" "style_enum" NOT NULL,
    "zone" VARCHAR(100) NOT NULL,
    "chasse_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carte_collection" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(45) NOT NULL,
    "style" "style_enum" NOT NULL,
    "zone" VARCHAR(100) NOT NULL,
    "echelle" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carte_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carte_geographique" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(45) NOT NULL,
    "style" "style_enum" NOT NULL,
    "zone" VARCHAR(100) NOT NULL,
    "echelle" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carte_geographique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chasse" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "mode" "mode_enum" NOT NULL,
    "date_de_fin" TIMESTAMP(6),
    "nb_max_participants" INTEGER,
    "frais" DECIMAL(10,2) DEFAULT 0,
    "chat_actif" BOOLEAN DEFAULT false,
    "monde" "monde_enum" NOT NULL,
    "createur_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "localisation" VARCHAR NOT NULL,

    CONSTRAINT "chasse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clef_validation" (
    "id" SERIAL NOT NULL,
    "type" "type_clef_enum" NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clef_validation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contenir" (
    "id" SERIAL NOT NULL,
    "chasse_id" INTEGER NOT NULL,
    "recompense_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contenir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creuser" (
    "id" SERIAL NOT NULL,
    "chasse_id" INTEGER NOT NULL,
    "cache_id" INTEGER NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creuser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etape" (
    "id" SERIAL NOT NULL,
    "indication" TEXT NOT NULL,
    "chasse_id" INTEGER NOT NULL,
    "carte_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "etape_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participer" (
    "id" SERIAL NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,
    "chasse_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posseder" (
    "id" SERIAL NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,
    "carte_collection_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posseder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recompense" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "type" "type_recompense_enum" NOT NULL,
    "contenu" TEXT NOT NULL,
    "createur_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recompense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "nom" "role_enum" NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utilisateur" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "portefeuille" DECIMAL(10,2) DEFAULT 0.00,
    "auth0_id" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_email_key" ON "utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_auth0_id_key" ON "utilisateur"("auth0_id");

-- AddForeignKey
ALTER TABLE "cache" ADD CONSTRAINT "cache_chasse_id_fkey" FOREIGN KEY ("chasse_id") REFERENCES "chasse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chasse" ADD CONSTRAINT "chasse_createur_id_fkey" FOREIGN KEY ("createur_id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contenir" ADD CONSTRAINT "contenir_chasse_id_fkey" FOREIGN KEY ("chasse_id") REFERENCES "chasse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contenir" ADD CONSTRAINT "contenir_recompense_id_fkey" FOREIGN KEY ("recompense_id") REFERENCES "recompense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "creuser" ADD CONSTRAINT "creuser_cache_id_fkey" FOREIGN KEY ("cache_id") REFERENCES "cache"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "creuser" ADD CONSTRAINT "creuser_chasse_id_fkey" FOREIGN KEY ("chasse_id") REFERENCES "chasse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "creuser" ADD CONSTRAINT "creuser_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "etape" ADD CONSTRAINT "etape_carte_id_fkey" FOREIGN KEY ("carte_id") REFERENCES "carte_geographique"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "etape" ADD CONSTRAINT "etape_chasse_id_fkey" FOREIGN KEY ("chasse_id") REFERENCES "chasse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participer" ADD CONSTRAINT "participer_chasse_id_fkey" FOREIGN KEY ("chasse_id") REFERENCES "chasse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participer" ADD CONSTRAINT "participer_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posseder" ADD CONSTRAINT "posseder_carte_collection_id_fkey" FOREIGN KEY ("carte_collection_id") REFERENCES "carte_collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posseder" ADD CONSTRAINT "posseder_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recompense" ADD CONSTRAINT "recompense_createur_id_fkey" FOREIGN KEY ("createur_id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utilisateur" ADD CONSTRAINT "utilisateur_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
