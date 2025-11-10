
import TicketForm from '@/components/TicketForm';
import { dict } from '@/lib/i18n';

export default function Page() {
  const lang = (typeof window === 'undefined') ? 'th' : (localStorage.getItem('lang') || 'th');
  const t = dict[lang as 'th'|'en'];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t.formTitle}</h1>
      <p className="text-gray-600 dark:text-gray-400">{t.formDesc}</p>
      <TicketForm />
    </div>
  );
}
