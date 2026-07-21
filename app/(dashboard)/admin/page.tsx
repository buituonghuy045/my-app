import { redirect } from 'next/navigation'
import React from 'react'

export default function AdminPage({ children, }: Readonly<{ children: React.ReactNode }>) {
    return redirect('/admin/dashboard')
}
