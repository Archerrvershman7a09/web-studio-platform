import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
const content = {
  ru: [
    "Этот раздел готовится",
    "Функция пока недоступна. Заявки, сообщения и платежи здесь ещё не принимаются. Можно изучить направления дизайна и процесс работы.",
    "Посмотреть концепции",
  ],
  en: [
    "This section is being prepared",
    "This feature is not available yet. Applications, messages and payments are not accepted here. You can explore the design directions and process.",
    "Explore concepts",
  ],
  ka: [
    "ეს განყოფილება მზადდება",
    "ფუნქცია ჯერ მიუწვდომელია. განაცხადები, შეტყობინებები და გადახდები ჯერ არ მიიღება. შეგიძლიათ გაეცნოთ დიზაინის მიმართულებებსა და პროცესს.",
    "კონცეფციების ნახვა",
  ],
};
export default function PendingFeature() {
  const { lang } = useI18n();
  const c = content[lang];
  return (
    <section className="studio-section">
      <h1 className="text-4xl mb-6">{c[0]}</h1>
      <p className="max-w-xl leading-8 mb-8">{c[1]}</p>
      <Link href="/works" className="studio-button">
        {c[2]} ↗
      </Link>
    </section>
  );
}
