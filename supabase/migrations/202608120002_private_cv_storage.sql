-- Keep uploaded CV assets private and scoped to images/<authenticated-user-id>/...
insert into storage.buckets (id, name, public)
values ('files', 'files', false)
on conflict (id) do update set public = false;

drop policy if exists "files_owner_read" on storage.objects;
drop policy if exists "files_owner_insert" on storage.objects;
drop policy if exists "files_owner_update" on storage.objects;
drop policy if exists "files_owner_delete" on storage.objects;

create policy "files_owner_read" on storage.objects for select to authenticated
using (bucket_id = 'files' and (storage.foldername(name))[1] = 'images' and (storage.foldername(name))[2] = auth.uid()::text);

create policy "files_owner_insert" on storage.objects for insert to authenticated
with check (bucket_id = 'files' and (storage.foldername(name))[1] = 'images' and (storage.foldername(name))[2] = auth.uid()::text);

create policy "files_owner_update" on storage.objects for update to authenticated
using (bucket_id = 'files' and (storage.foldername(name))[1] = 'images' and (storage.foldername(name))[2] = auth.uid()::text)
with check (bucket_id = 'files' and (storage.foldername(name))[1] = 'images' and (storage.foldername(name))[2] = auth.uid()::text);

create policy "files_owner_delete" on storage.objects for delete to authenticated
using (bucket_id = 'files' and (storage.foldername(name))[1] = 'images' and (storage.foldername(name))[2] = auth.uid()::text);
