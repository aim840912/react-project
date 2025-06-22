import { worker } from '../mocks/browser';

export async function enableMocking() {
    if (typeof window === 'undefined') {
        return;
    }

    console.log('MSW is starting...');

    await worker.start({
        onUnhandledRequest: 'warn',
    });

    console.log('MSW has started!');
}