
'use client';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function AuthPage(){
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-sm mx-auto card space-y-3">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button className="btn btn-primary" onClick={async()=>{
        const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/dashboard` } });
        if (!error) setSent(true); else alert(error.message);
      }}>Send magic link</button>
      {sent && <p className="text-green-600">Check your inbox for the magic link.</p>}
    </div>
  );
}
