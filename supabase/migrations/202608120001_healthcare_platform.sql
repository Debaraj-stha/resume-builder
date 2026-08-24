create extension if not exists pgcrypto;

create table if not exists public.healthcare_profiles (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  profession text not null, specialty text, experience_level text, target_countries text[] default '{}', target_roles text[] default '{}',
  profile_data jsonb not null default '{}'::jsonb, completion_percent int not null default 0 check (completion_percent between 0 and 100),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(owner_id)
);
create table if not exists public.healthcare_resumes (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.healthcare_profiles(id) on delete set null, title text not null, cv_type text not null,
  target_country text, target_role text, specialty text, template_id text, content jsonb not null default '{}'::jsonb,
  is_master boolean not null default false, last_ats_score int check (last_ats_score between 0 and 100),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.resume_sections (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  resume_id uuid not null references public.healthcare_resumes(id) on delete cascade, section_type text not null,
  position int not null default 0, content jsonb not null default '{}'::jsonb, approved_by_user boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.healthcare_profiles(id) on delete cascade, credential_type text not null, issuing_authority text,
  status text, eligibility_status text, dataflow_status text, examination_status text, issue_date date, expiry_date date,
  country text, verification_status text, private_reference_hint text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.job_descriptions (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null, employer text, country text, source_url text, content text not null check (char_length(content)<=20000),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.ats_analyses (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  resume_id uuid not null references public.healthcare_resumes(id) on delete cascade,
  job_description_id uuid references public.job_descriptions(id) on delete set null, overall_score int check (overall_score between 0 and 100),
  component_scores jsonb not null, findings jsonb not null, engine_version text not null default 'healthcare-ats-v1',
  created_at timestamptz not null default now()
);
create table if not exists public.cover_letters (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  resume_id uuid references public.healthcare_resumes(id) on delete set null, job_description_id uuid references public.job_descriptions(id) on delete set null,
  title text not null, target_position text, facility text, country text, content text not null, approved_by_user boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  resume_id uuid references public.healthcare_resumes(id) on delete set null, cover_letter_id uuid references public.cover_letters(id) on delete set null,
  employer text, position text not null, country text, status text not null default 'planned', applied_at timestamptz, notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.subscription_records (
  id uuid primary key default gen_random_uuid(), owner_id uuid references auth.users(id) on delete cascade,
  provider text not null default 'razorpay', provider_payment_id text, provider_order_id text, provider_event_id text unique,
  plan_id text not null check(plan_id in ('monthly','annual','lifetime')), status text not null,
  starts_at timestamptz, expires_at timestamptz, amount_minor int, currency text default 'INR',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(provider_payment_id)
);

alter table public.healthcare_profiles enable row level security;
alter table public.healthcare_resumes enable row level security;
alter table public.resume_sections enable row level security;
alter table public.credentials enable row level security;
alter table public.job_descriptions enable row level security;
alter table public.ats_analyses enable row level security;
alter table public.cover_letters enable row level security;
alter table public.applications enable row level security;
alter table public.subscription_records enable row level security;

do $$ declare t text; begin
  foreach t in array array['healthcare_profiles','healthcare_resumes','resume_sections','credentials','job_descriptions','ats_analyses','cover_letters','applications']
  loop
    execute format('drop policy if exists owner_all on public.%I',t);
    execute format('create policy owner_all on public.%I for all using (auth.uid()=owner_id) with check (auth.uid()=owner_id)',t);
  end loop;
end $$;
drop policy if exists owner_read_subscription on public.subscription_records;
create policy owner_read_subscription on public.subscription_records for select using (auth.uid()=owner_id);

create index if not exists idx_healthcare_resumes_owner on public.healthcare_resumes(owner_id,updated_at desc);
create index if not exists idx_credentials_expiry on public.credentials(owner_id,expiry_date);
create index if not exists idx_ats_resume on public.ats_analyses(resume_id,created_at desc);
