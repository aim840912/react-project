// src/sentry.ts
import * as Sentry from '@sentry/react';

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration()],
    tracePropagationTargets: ['localhost', 'your-domain.com'], // 根據需要調整
    tracesSampleRate: 1.0,
});