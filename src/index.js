import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { TodoProvider } from './context/TodoContext';

/**
 * Entry point of the React application.
 * Creates the root React node and renders the application
 * wrapped inside the TodoProvider context.
 *
 * The provider makes global todo state available to all components.
 */

// Create React root
const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * Render the application
 */
root.render(
    <TodoProvider>
        <App />
    </TodoProvider>
);