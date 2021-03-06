import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider,} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {BrowserRouter,} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
// Create a client
export const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);


