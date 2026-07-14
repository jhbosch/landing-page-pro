-- ============================================================
-- INITIAL SCHEMA — landing-page-pro
-- Tablas: products, offers, categories, testimonials,
--          statistics, leads
-- ============================================================

-- ── Helper: updated_at trigger ──────────────────────────────

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── 1. PRODUCTS ─────────────────────────────────────────────

create table public.products (
  id            uuid        default gen_random_uuid() primary key,
  name          text        not null,
  brand         text,
  year          text,
  price         numeric     not null,
  original_price numeric,
  image_url     text,
  description   text,
  category      text,
  specs         text[]      default '{}'::text[] not null,
  rating        numeric     default 0 not null,
  reviews       integer     default 0 not null,
  is_featured   boolean     default false not null,
  is_best_seller boolean    default false not null,
  is_new_arrival boolean    default false not null,
  badge         text,
  status        text        not null default 'active'
                              check (status in ('active', 'hidden')),
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

-- ── 2. OFFERS ───────────────────────────────────────────────

create table public.offers (
  id            uuid        default gen_random_uuid() primary key,
  title         text        not null,
  description   text,
  image_url     text,
  discount      text,
  price         numeric,
  original_price numeric,
  ends_at       timestamptz,
  status        text        not null default 'active'
                              check (status in ('active', 'hidden')),
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_offers_updated_at
  before update on public.offers
  for each row execute function public.handle_updated_at();

-- ── 3. CATEGORIES ───────────────────────────────────────────

create table public.categories (
  id            uuid        default gen_random_uuid() primary key,
  name          text        not null,
  description   text,
  image_url     text,
  icon          text,
  count         integer     not null default 0,
  status        text        not null default 'active'
                              check (status in ('active', 'hidden')),
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_categories_updated_at
  before update on public.categories
  for each row execute function public.handle_updated_at();

-- ── 4. TESTIMONIALS ─────────────────────────────────────────

create table public.testimonials (
  id            uuid        default gen_random_uuid() primary key,
  name          text        not null,
  role          text,
  avatar_url    text,
  content       text        not null,
  rating        numeric     default 5,
  status        text        not null default 'active'
                              check (status in ('active', 'hidden')),
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.handle_updated_at();

-- ── 5. STATISTICS ───────────────────────────────────────────

create table public.statistics (
  id            uuid        default gen_random_uuid() primary key,
  label         text        not null,
  value         text        not null,
  suffix        text,
  icon          text,
  status        text        not null default 'active'
                              check (status in ('active', 'hidden')),
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_statistics_updated_at
  before update on public.statistics
  for each row execute function public.handle_updated_at();

-- ── 6. LEADS ────────────────────────────────────────────────

create table public.leads (
  id            uuid         default gen_random_uuid() primary key,
  name          text         not null,
  email         text         not null,
  phone         text,
  interest      text,
  message       text,
  status        text         not null default 'new'
                               check (status in ('new', 'contacted', 'closed')),
  created_at    timestamptz  not null default now()
  -- Nota: lead no tiene updated_ap — es un log de contacto
);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

-- Enable RLS en todas las tablas
alter table public.products    enable row level security;
alter table public.offers      enable row level security;
alter table public.categories  enable row level security;
alter table public.testimonials enable row level security;
alter table public.statistics  enable row level security;
alter table public.leads       enable row level security;

-- ── Políticas públicas (anon) ───────────────────────────────
-- Cualquier visitante puede leer SOLO filas con status = 'active'

create policy "Public can read active products"
  on public.products for select
  using (status = 'active');

create policy "Public can read active offers"
  on public.offers for select
  using (status = 'active');

create policy "Public can read active categories"
  on public.categories for select
  using (status = 'active');

create policy "Public can read active testimonials"
  on public.testimonials for select
  using (status = 'active');

create policy "Public can read active statistics"
  on public.statistics for select
  using (status = 'active');

-- Leads: cualquiera puede INSERT (formulario público)
-- pero NADIE puede SELECT sin ser admin
create policy "Anyone can insert leads"
  on public.leads for insert
  with check (true);

create policy "Only admins can read leads"
  on public.leads for select
  using (auth.role() = 'authenticated');

-- ── Políticas admin (authenticated) ─────────────────────────
-- Un usuario con sesión puede hacer TODO (lectura completa + escritura)

create policy "Admin full access on products"
  on public.products for all
  using (auth.role() = 'authenticated');

create policy "Admin full access on offers"
  on public.offers for all
  using (auth.role() = 'authenticated');

create policy "Admin full access on categories"
  on public.categories for all
  using (auth.role() = 'authenticated');

create policy "Admin full access on testimonials"
  on public.testimonials for all
  using (auth.role() = 'authenticated');

create policy "Admin full access on statistics"
  on public.statistics for all
  using (auth.role() = 'authenticated');

create policy "Admin full access on leads"
  on public.leads for all
  using (auth.role() = 'authenticated');

-- ============================================================
-- Índices útiles
-- ============================================================

create index idx_products_sort_order  on public.products (sort_order);
create index idx_offers_sort_order    on public.offers (sort_order);
create index idx_categories_sort_order on public.categories (sort_order);
create index idx_testimonials_sort_order on public.testimonials (sort_order);
create index idx_statistics_sort_order  on public.statistics (sort_order);
create index idx_leads_created_at     on public.leads (created_at desc);
