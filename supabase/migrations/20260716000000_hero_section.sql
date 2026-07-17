-- ============================================================
-- HERO SECTION — hero_config (single row) + trust_badges
-- ============================================================

-- ── 1. HERO CONFIG (single-row) ─────────────────────────────

create table public.hero_config (
  id                 uuid        default gen_random_uuid() primary key,
  badge_text         text        not null default 'Oferta por tiempo limitado',
  headline           text        not null default 'Encuentra el vehículo *perfecto* para tu aventura',
  subheadline        text        not null default 'Potencia, estilo y libertad. Las mejores marcas con financiamiento a tu medida.',
  cta_primary        text        not null default 'Comprar ahora',
  cta_secondary      text        not null default 'Ver catálogo',
  updated_at         timestamptz not null default now()
);

-- Insertar la fila única por defecto
insert into public.hero_config (id) values (gen_random_uuid());

-- Trigger para updated_at automático
create trigger trg_hero_config_updated_at
  before update on public.hero_config
  for each row execute function public.handle_updated_at();

-- ── 2. TRUST BADGES ─────────────────────────────────────────

create table public.trust_badges (
  id            uuid        default gen_random_uuid() primary key,
  icon          text        not null default 'Shield',
  title         text        not null,
  description   text        not null default '',
  status        text        not null default 'active'
                              check (status in ('active', 'hidden')),
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Trigger para updated_at automático
create trigger trg_trust_badges_updated_at
  before update on public.trust_badges
  for each row execute function public.handle_updated_at();

-- Insertar los dos badges por defecto
insert into public.trust_badges (icon, title, description, sort_order) values
  ('Shield', 'Garantía', '1 año completo', 0),
  ('Truck', 'Entrega rápida', 'todo el país', 1);

-- ── 3. RLS ──────────────────────────────────────────────────

alter table public.hero_config   enable row level security;
alter table public.trust_badges  enable row level security;

-- El público puede leer
create policy "Public can read hero_config"
  on public.hero_config for select
  using (true);

create policy "Public can read active trust_badges"
  on public.trust_badges for select
  using (status = 'active');

-- Admins autenticados pueden todo
create policy "Admin full access on hero_config"
  on public.hero_config for all
  using (auth.role() = 'authenticated');

create policy "Admin full access on trust_badges"
  on public.trust_badges for all
  using (auth.role() = 'authenticated');

-- ── 4. ÍNDICES ──────────────────────────────────────────────

create index idx_trust_badges_sort_order on public.trust_badges (sort_order);
