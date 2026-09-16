import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
export default function NotFound() {
 const { lang } = useI18n();
 const words = {ru:['Страница не найдена','На главную'],en:['Page not found','Back home'],ka:['გვერდი ვერ მოიძებნა','მთავარზე დაბრუნება']}[lang];
 return <section className="studio-section"><p className="eyebrow">404</p><h1 className="text-4xl mb-8">{words[0]}</h1><Link href="/" className="studio-button">{words[1]}</Link></section>;
}
