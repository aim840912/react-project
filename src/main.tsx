import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App';
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './i18n';

async function main() {
  if (import.meta.env.DEV) {
    const { enableMocking } = await import('./dev/msw');
    await enableMocking();
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}

main();
