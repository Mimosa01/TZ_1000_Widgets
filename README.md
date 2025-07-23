# 10 000 Widgets — High-Performance Real-Time Dashboard

## Описание

Этот проект — высокопроизводительный дашборд на 10 000 виджетов с обновлением в реальном времени через WebSocket.  
Включает фронтенд на Next.js/React и бэкенд на Express, полностью контейнеризирован с помощью Docker.

- **Фронтенд:** Next.js, React 19, Zustand, react-window (виртуализация), TailwindCSS, TypeScript
- **Бэкенд:** Express, WebSocket (ws)
- **Docker:** Полная поддержка docker-compose для локального запуска

---

## Быстрый старт (через Docker)

1. **Соберите и запустите проект:**
   ```sh
   docker-compose up --build
   ```

2. **Откройте в браузере:**
   - [http://localhost:3000](http://localhost:3000) — интерфейс дашборда

3. **Бэкенд (WebSocket API):**
   - [ws://localhost:3001](ws://localhost:3001) — WebSocket сервер

---

## Структура репозитория

```
.
├── tz-app/        # Фронтенд (Next.js, React, Zustand, Tailwind)
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── tz-server/     # Бэкенд (Express, WebSocket)
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── docker-compose.yml
```

---

## Основные возможности

- **10 000 виджетов** с уникальными именами и случайными начальными значениями от -100 до 100
- **Виртуализация** (react-window) для плавного скролла и высокой производительности
- **Реальное время:** обновления приходят по WebSocket только для изменённых элементов (патчи)
- **Мгновенный отклик:** оптимизированное хранилище Zustand, минимальные перерендеры
- **Контейнеризация:** всё запускается одной командой через Docker

---

## Локальная разработка (без Docker)

### Фронтенд

```sh
cd tz-app
npm install
npm run dev
# Откройте http://localhost:3000
```

### Бэкенд

```sh
cd tz-server
npm install
npm start
# WebSocket сервер на ws://localhost:3001
```

---

## Переменные окружения

Для локального запуска переменные не требуются.  
В Docker всё работает «из коробки».

---

## Технологии

- **Frontend:** Next.js 15, React 19, Zustand, react-window, TailwindCSS, TypeScript
- **Backend:** Express, ws (WebSocket)
- **DevOps:** Docker, docker-compose

---

## Автор

- Реализация: Кирилл Тарачов
- Вопросы и предложения: tarachoff5@gmail.com

---

## Лицензия

MIT
