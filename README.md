# Web Studio Platform

Платформа студии для бизнеса в Грузии. В разработке, не готова к приёму заказов.

Основной сайт: `artifacts/tbilisi-web-studio` (React, TypeScript, Vite).

## Сборка

Node.js 24, pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm build:studio
pnpm --filter @workspace/tbilisi-web-studio typecheck
```

Результат: `artifacts/tbilisi-web-studio/dist/public`.
Не требуются переменные окружения редактора, аккаунты или ключи для статической сборки.

Для Vercel используется `vercel.json` в корне репозитория.
Собирается только основной сайт, не экспериментальный mockup-sandbox и не API-заготовка.
Деплой пока не выполнен. Подробный объём оставшихся работ: [docs/IMPLEMENTATION-STATUS.md](docs/IMPLEMENTATION-STATUS.md).
