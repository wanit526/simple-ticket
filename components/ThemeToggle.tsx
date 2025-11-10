
'use client';
import { useEffect, useState } from 'react';
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(()=>{
    const d = localStorage.getItem('theme-dark') === '1';
    setDark(d);
    document.documentElement.classList.toggle('dark', d);
  },[]);
  return (
    <button className="btn" onClick={()=>{
      const next = !dark;
      setDark(next);
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme-dark', next ? '1':'0');
    }}>{dark ? '🌙 Dark' : '☀️ Light'}</button>
  );
}
