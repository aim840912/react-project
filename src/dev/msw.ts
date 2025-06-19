import { worker } from '../mocks/browser';

/**
 * 在開發環境中啟動 MSW (Mock Service Worker)。
 * 這個函數會被動態匯入，並只在 Vite 的開發模式下執行。
 * 它會回傳一個 Promise，以便主應用程式可以等待它完成。
 */
export async function enableMocking() {
    // 檢查是否在瀏覽器環境中，因為 MSW 只在瀏覽器中運作
    if (typeof window === 'undefined') {
        return;
    }

    console.log('MSW is starting...');

    // 啟動 MSW Worker
    // `start()` 方法是異步的，它會回傳一個 Promise
    await worker.start({
        // `onUnhandledRequest` 可以在 console 中提示哪些請求沒有被 mock
        // 這在開發時非常有用，可以避免忘記 mock 某些 API
        onUnhandledRequest: 'warn',
    });

    console.log('MSW has started!');
}