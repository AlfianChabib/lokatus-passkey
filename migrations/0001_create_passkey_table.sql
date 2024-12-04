-- CreateTable
CREATE TABLE "Passkey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL DEFAULT 'lokatus1234',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Passkey_key_key" ON "Passkey"("key");

INSERT INTO "Passkey" ("key", "createdAt", "updatedAt") VALUES ('lokatus1234', '2024-12-04T13:10:18.013Z', '2024-12-04T00:00:40.969+00:00');