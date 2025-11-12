import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize theme
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'system';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const theme = savedTheme === 'system' ? systemTheme : savedTheme;
root.setAttribute('data-theme', theme);

createRoot(document.getElementById("root")!).render(<App />);