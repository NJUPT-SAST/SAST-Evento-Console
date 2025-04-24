import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import EventDetail from '@/pages/EventDetail'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="eventDetail/:id" element={<EventDetail />} />
    </Route>
  )
)
