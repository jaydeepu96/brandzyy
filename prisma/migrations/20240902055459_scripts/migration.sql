-- CreateTable
CREATE TABLE "HeaderScript" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "script" TEXT NOT NULL,
    "fileName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "storeId" TEXT NOT NULL,
    CONSTRAINT "HeaderScript_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
