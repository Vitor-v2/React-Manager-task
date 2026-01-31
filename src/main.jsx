import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Toaster } from 'sonner'

import App from './App.jsx'
import TaskDetailPage from './pages/TaskDetails.jsx'
import TaskManager from './pages/TaskManage.jsx'

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
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <Toaster
                expand="true"
                visibleToasts={1}
                theme="system"
                richColors="true"
            />
            <RouterProvider router={router} />
        </StrictMode>
    </QueryClientProvider>
)
