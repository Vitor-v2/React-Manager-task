import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.jsx'
import TaskDetailPage from './pages/task-details.jsx'
import TaskManager from './pages/task-manage.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/tasks',
        element: <TaskManager />,
    },
    {
        path: '/tasks/:taskId',
        element: <TaskDetailPage />,
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
)
