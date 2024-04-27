/*
  Warnings:

  - The primary key for the `WOFPuzzle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `WOFPuzzle` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WOFPuzzle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "words" INTEGER NOT NULL,
    "letters" INTEGER NOT NULL,
    "puzzle" TEXT NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_WOFPuzzle" ("category", "id", "letters", "puzzle", "words") SELECT "category", "id", "letters", "puzzle", "words" FROM "WOFPuzzle";
DROP TABLE "WOFPuzzle";
ALTER TABLE "new_WOFPuzzle" RENAME TO "WOFPuzzle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
