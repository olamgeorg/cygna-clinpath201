# cygna_clinpath201 - Clinical Pathology 201 Quiz (© cygna.co - cygna.consult)
1. **Supabase**: supabase.com > New project > SQL Editor > paste `schema.sql` > Run. Settings > API: copy Project URL + publishable key into `supabase-config.js` (already filled). Authentication > URL Configuration: set Site URL to your Vercel link (needed for password reset).
2. **GitHub**: New repository > Add file > Upload files > drag all files in this folder > Commit.
3. **Vercel**: Add New Project > import the repo > Framework "Other" > Deploy (no build step).
4. **Keys note**: a static site cannot read Vercel env vars without a build step. The publishable key is public by design and is protected by the Row Level Security in `schema.sql`. Never commit the service_role/secret key.
5. **Admin**: sign up with olamgeorg9@gmail.com (Name: Olamide George), login, then open Admin Dashboard (admin.html). Others are redirected.
