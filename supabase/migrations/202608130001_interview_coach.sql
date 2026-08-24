create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  target_role text not null,
  profession text not null,
  specialty text,
  target_country text,
  interview_type text not null default 'Quick Practice',
  personality text not null default 'Professional',
  cv_snapshot text not null default '',
  job_description_snapshot text not null default '',
  question_count int not null default 5 check (question_count between 5 and 20),
  overall_score int check (overall_score between 0 and 100),
  status text not null default 'in_progress' check (status in ('in_progress','completed','abandoned')),
  report jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.interview_questions (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null references public.interviews(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  question_number int not null,
  question text not null,
  category text,
  why_it_matters text,
  created_at timestamptz not null default now()
);

create table if not exists public.interview_answers (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null references public.interviews(id) on delete cascade,
  question_id uuid not null references public.interview_questions(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  answer text not null,
  score int check (score between 0 and 100),
  breakdown jsonb not null default '{}'::jsonb,
  feedback jsonb not null default '{}'::jsonb,
  improved_answer text,
  created_at timestamptz not null default now()
);

alter table public.interviews enable row level security;
alter table public.interview_questions enable row level security;
alter table public.interview_answers enable row level security;

drop policy if exists interview_owner_all on public.interviews;
create policy interview_owner_all on public.interviews for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists interview_question_owner_all on public.interview_questions;
create policy interview_question_owner_all on public.interview_questions for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists interview_answer_owner_all on public.interview_answers;
create policy interview_answer_owner_all on public.interview_answers for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create index if not exists idx_interviews_owner_created on public.interviews(owner_id, created_at desc);
create index if not exists idx_interview_questions_interview on public.interview_questions(interview_id, question_number);
create index if not exists idx_interview_answers_interview on public.interview_answers(interview_id, created_at);
