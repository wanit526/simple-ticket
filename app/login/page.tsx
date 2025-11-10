'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-xl p-8 w-[360px]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">เข้าสู่ระบบ</h2>

        <input
          type="email"
          placeholder="อีเมล"
          className="input input-bordered w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="input input-bordered w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  )
}
