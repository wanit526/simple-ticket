
'use client';
import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/i18n';
export default function LangToggle() {
  const [lang, setLang] = useState<Lang>('th');
  useEffect(()=>{
    const l = (localStorage.getItem('lang') as Lang) || 'th';
    setLang(l);
  },[]);
  return (
    <select className="btn" value={lang} onChange={(e)=>{
      const l = e.target.value as Lang;
      localStorage.setItem('lang', l);
      setLang(l);
      location.reload(); // simplest way for demo
    }}>
      <option value="th">TH 🇹🇭</option>
      <option value="en">EN 🇬🇧</option>
    </select>
  );
}
