-- Check if credits column exists before adding it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'credits'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "credits" integer DEFAULT 100 NOT NULL;
    END IF;
END $$;