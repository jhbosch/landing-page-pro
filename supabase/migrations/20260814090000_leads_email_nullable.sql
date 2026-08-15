-- Email opcional en leads: el checkout de ofertas abre WhatsApp
-- sin requerir email, así que la columna debe aceptar NULL.
alter table public.leads alter column email drop not null;