-- Fix: asegura que la policy de insert anónimo en leads existe
-- El formulario de contacto público necesita insertar sin auth

-- Drop la policy existente por si ya está pero mal configurada
drop policy if exists "Anyone can insert leads" on public.leads;

-- Re-crea la policy: cualquier visitante puede insertar leads
create policy "Anyone can insert leads"
  on public.leads for insert
  with check (true);

-- También aseguramos que los admins autenticados puedan leer
drop policy if exists "Only admins can read leads" on public.leads;

create policy "Only admins can read leads"
  on public.leads for select
  using (auth.role() = 'authenticated');

-- Full access para admins
drop policy if exists "Admin full access on leads" on public.leads;

create policy "Admin full access on leads"
  on public.leads for all
  using (auth.role() = 'authenticated');
