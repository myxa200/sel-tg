# Uzum Reviews to Telegram

Скрипт, который получает отзывы с Uzum и отправляет их в Telegram.

## Настройка
1. Создай `.env` с такими переменными:
- `UZUM_API_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

2. Подключи проект к [Vercel](https://vercel.com), и он будет запускаться каждые 10 минут.

## Структура
- `/api/getReviews.ts` — получает отзывы и отправляет в Telegram
- `/lib/telegram.ts` — отправка сообщений
