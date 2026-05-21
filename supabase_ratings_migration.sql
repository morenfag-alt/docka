-- Таблица оценок шаблонов (Google Play алгоритм: 1 голос на пользователя)
-- Запустить в Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS template_ratings (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id uuid NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating      smallint NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at  timestamptz DEFAULT now(),
  -- Уникальный ключ: 1 пользователь = 1 голос на шаблон
  UNIQUE (template_id, user_id)
);

ALTER TABLE template_ratings ENABLE ROW LEVEL SECURITY;

-- Читать могут все (для отображения среднего рейтинга)
CREATE POLICY "Читать могут все" ON template_ratings
  FOR SELECT USING (true);

-- Авторизованные могут добавить оценку (только INSERT, не UPDATE)
-- При повторной попытке INSERT с тем же (template_id, user_id) — игнорируется (ON CONFLICT DO NOTHING)
CREATE POLICY "Авторизованные могут ставить оценки" ON template_ratings
  FOR INSERT WITH CHECK (true);

-- Нет политики UPDATE — изменить оценку нельзя (как в Google Play)
