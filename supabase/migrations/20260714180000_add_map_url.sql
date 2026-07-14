-- ============================================================
-- ADD map_url TO site_config
-- URL embebida de Google Maps para mostrar sucursal
-- ============================================================

alter table public.site_config
  add column map_url text;
