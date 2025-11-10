'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // ✅ ใช้ client สำหรับฝั่ง browser
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  // ✅ ตรวจสอบว่าเข้าสู่ระบบหรือยัง
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login');
      } else {
        setSession(data.session);
      }
    });
  }, [router]);

  // ✅ ดึงข้อมูล tickets เฉพาะหลังจาก login แล้วเท่านั้น
  useEffect(() => {
    if (!session) return;

    async function fetchTickets() {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      setTickets(data || []);
      setFiltered(data || []);
      setLoading(false);
    }
    fetchTickets();
  }, [session]);

  // 🟢 เปลี่ยนสถานะ
  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/tickets/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (result.success) {
      const updated = tickets.map((t) =>
        t.id === id ? { ...t, status } : t
      );
      setTickets(updated);
      applyFilter(filter, updated);
    }
  }

  // 🔹 ฟังก์ชันกรองข้อมูล
  function applyFilter(f: string, source = tickets) {
    setFilter(f);
    if (f === 'All') setFiltered(source);
    else setFiltered(source.filter((t) => t.status === f));
  }

  if (!session) return <p className="text-center py-10">กำลังตรวจสอบการเข้าสู่ระบบ...</p>;
  if (loading) return <p className="text-center py-10">กำลังโหลดข้อมูล...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">📋 รายการตั๋วทั้งหมด</h1>

        {/* 🟣 Filter dropdown */}
        <select
          value={filter}
          onChange={(e) => applyFilter(e.target.value)}
          className="border rounded px-3 py-1 text-sm w-40 sm:w-48"
        >
          <option value="All">ทั้งหมด</option>
          <option value="New">ใหม่</option>
          <option value="In Progress">กำลังดำเนินการ</option>
          <option value="Done">เสร็จสิ้น</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">ไม่พบรายการในหมวดนี้</p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-semibold">{t.name} ({t.department})</h2>
              <p className="text-sm text-gray-500">
                {t.category} | {t.priority} |{' '}
                <span className="font-medium">สถานะ:</span>{' '}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    t.status === 'Done'
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : t.status === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300'
                  }`}
                >
                  {t.status ?? 'New'}
                </span>
              </p>

              <p className="mt-2">{t.description}</p>

              {/* ปุ่มเปลี่ยนสถานะ */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => updateStatus(t.id, 'In Progress')}
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded border border-yellow-300 transition"
                >
                  กำลังดำเนินการ
                </button>
                <button
                  onClick={() => updateStatus(t.id, 'Done')}
                  className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded border border-green-300 transition"
                >
                  เสร็จสิ้น
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(t.created_at).toLocaleString('th-TH')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
