
'use client';
export type Filters = { status?: string; priority?: string };
export default function TicketFilters({ filters, onChange }: {
  filters: Filters; onChange: (next: Filters)=>void;
}){
  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div>
        <label className="block text-xs font-medium">สถานะ / Status</label>
        <select
          className="border rounded-xl p-2"
          value={filters.status ?? ''}
          onChange={(e)=>onChange({ ...filters, status: e.target.value || undefined })}
        >
          <option value="">All</option>
          <option>New</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium">ความด่วน / Priority</label>
        <select
          className="border rounded-xl p-2"
          value={filters.priority ?? ''}
          onChange={(e)=>onChange({ ...filters, priority: e.target.value || undefined })}
        >
          <option value="">All</option>
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
      </div>
    </div>
  );
}
