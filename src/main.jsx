import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Toaster } from 'sonner'

import { Home } from './pages/Home.jsx'
import TaskDetailPage from './pages/TaskDetails.jsx'
import { TasksPage } from './pages/Tasks.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/tasks',
        element: <TasksPage />,
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
