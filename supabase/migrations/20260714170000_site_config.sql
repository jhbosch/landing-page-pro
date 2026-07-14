-- ============================================================
-- SITE CONFIG — configuración general del sitio
-- Tabla de una sola fila con datos de contacto y redes
-- ============================================================

create table public.site_config (
  id            uuid        default gen_random_uuid() primary key,
  site_name     text        not null default 'MotoRex',
  phone         text        not null default '+52 55 1234 5678',
  email         text        not null default 'ventas@motorex.mx',
  address       text        not null default 'Av. Insurgentes Sur 1234, CDMX',
  whatsapp      text        not null default '1234567890',
  facebook_url  text,
  instagram_url text,
  twitter_url   text,
  youtube_url   text,
  updated_at    timestamptz not null default now()
);

-- Insertar la fila única por defecto
insert into public.site_config (id) values (gen_random_uuid());

-- Trigger para updated_at automático
create trigger trg_site_config_updated_at
  before update on public.site_config
  for each row execute function public.handle_updated_at();

-- RLS
alter table public.site_config enable row level security;

-- El público puede leer la config (para mostrar en frontend)
create policy "Public can read site_config"
  on public.site_config for select
  using (true);

-- Solo admins autenticados pueden modificar
create policy "Admin full access on site_config"
  on public.site_config for all
  using (auth.role() = 'authenticated');
