import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const copy = {
  ru: {
    tag: "ВЕБ-ДИЗАЙН И РАЗРАБОТКА · ГРУЗИЯ",
    title: "Ваш бизнес.",
    accent: "Его цифровой характер.",
    intro:
      "Индивидуальные сайты, в которых красота помогает делу. Покажите услуги, принимайте заявки и дайте клиентам простой путь к вам.",
    primary: "Рассчитать мой сайт",
    secondary: "Посмотреть концепции",
    note: "От первой идеи до запуска и передачи управления.",
    collection: "01 / НАПРАВЛЕНИЯ",
    works: "Разный бизнес. Разное настроение.",
    workIntro:
      "Три самостоятельные демонстрации с интерактивными элементами. Это концепции, а не выполненные клиентские заказы.",
    types: ["Кафе и рестораны", "Красота и уход", "Мебель и интерьер"],
    captions: [
      "Тёплый свет. Живые встречи.",
      "Пространство для себя.",
      "Меньше вещей. Больше смысла.",
    ],
    details: [
      "Меню, бронирование, карта",
      "Услуги, мастера, запись",
      "Каталог, материалы, корзина",
    ],
    concept: "Визуальный эскиз",
    processTag: "02 / СОТРУДНИЧЕСТВО",
    process: "Понятно на каждом шаге.",
    steps: [
      [
        "Знакомимся с задачей",
        "Вы рассказываете о бизнесе, выбираете стиль и нужные функции.",
      ],
      [
        "Согласовываем решение",
        "Обсуждаем концепцию, состав работ, сроки, стоимость и границы правок.",
      ],
      [
        "Создаём и уточняем",
        "Вы проверяете результат в предпросмотре и оставляете замечания.",
      ],
      [
        "Передаём вам",
        "После принятия и подтверждённой оплаты — запуск, доступы и инструкция.",
      ],
    ],
    priceTag: "03 / СТОИМОСТЬ",
    price: "Вы платите за понятный объём работы.",
    priceBody:
      "Дизайн, разработка, материалы, интеграции, проверка и запуск — отдельные части сметы. Регулярные расходы показываем отдельно. Окончательная стоимость фиксируется после согласования.",
    priceNote:
      "Расчёт ещё готовится: ставки студии не настроены. Здесь нет вымышленных цен.",
    reviews: "Отзывы появляются после настоящих проектов.",
    reviewBody:
      "Пока подтверждённых отзывов нет. После завершения заказа клиент сможет поделиться опытом и поставить оценку.",
    faq: "До начала работы",
    questions: [
      [
        "Когда оплачивать?",
        "Основной сценарий — после просмотра, согласованных правок и принятия результата. Условия и объём работ согласовываются заранее.",
      ],
      [
        "Смогу ли я управлять сайтом?",
        "В согласованный состав проекта включаем нужные функции редактирования, административные доступы и понятную инструкцию.",
      ],
      [
        "У меня уже есть сайт",
        "Можно обсудить редизайн или перенос. Сначала оценим текущий сайт, материалы и необходимые изменения.",
      ],
      [
        "Что входит в регулярные расходы?",
        "Домен, размещение и выбранные сторонние сервисы. Их состав и стоимость нужно уточнить до согласования заказа.",
      ],
    ],
    preview:
      "Платформа в разработке. Приём заявок и регистрация ещё не подключены.",
    explore: "Выберите настроение",
    footer: "Индивидуальный дизайн. Понятный процесс.",
  },
  en: {
    tag: "WEB DESIGN & DEVELOPMENT · GEORGIA",
    title: "Your business.",
    accent: "Its digital character.",
    intro:
      "Individual websites where beauty serves a purpose. Present your services, collect inquiries and give customers a clear path to you.",
    primary: "Estimate my website",
    secondary: "Explore concepts",
    note: "From the first idea to launch and ownership.",
    collection: "01 / DIRECTIONS",
    works: "Different businesses. Different worlds.",
    workIntro:
      "Three standalone demonstrations with interactive elements. These are concepts, not completed client commissions.",
    types: ["Cafes & restaurants", "Beauty & care", "Furniture & interiors"],
    captions: [
      "Warm light. Real connections.",
      "A little space for yourself.",
      "Fewer things. More meaning.",
    ],
    details: [
      "Menu, reservations, map",
      "Services, specialists, appointments",
      "Catalog, materials, cart",
    ],
    concept: "Visual sketch",
    processTag: "02 / THE PROCESS",
    process: "Clarity at every step.",
    steps: [
      [
        "Understand your business",
        "Tell us about your goals, preferred style and required features.",
      ],
      [
        "Agree on the solution",
        "Review the concept, scope, schedule, price and revision limits.",
      ],
      ["Create and refine", "Review the preview and share your feedback."],
      [
        "Make it yours",
        "After acceptance and verified payment: launch, access and guidance.",
      ],
    ],
    priceTag: "03 / PRICING",
    price: "A clear scope. A considered price.",
    priceBody:
      "Design, development, content, integrations, testing and launch are separate parts of the estimate. Recurring costs are shown separately. The final quote is agreed in advance.",
    priceNote:
      "The estimator is being prepared. Studio rates are not configured; no invented prices are displayed.",
    reviews: "Real reviews follow real projects.",
    reviewBody:
      "No verified reviews yet. Customers will be able to rate their experience after a completed order.",
    faq: "Before we begin",
    questions: [
      [
        "When do I pay?",
        "The main workflow is payment after preview, agreed revisions and acceptance. Scope and conditions are agreed before work begins.",
      ],
      [
        "Can I manage the website?",
        "The agreed scope includes the editing features, admin access and guidance you need.",
      ],
      [
        "I already have a website",
        "We can discuss redesign or migration after reviewing the existing website, content and requirements.",
      ],
      [
        "What are the recurring costs?",
        "Domain, hosting and selected third-party services. These must be clarified before agreement.",
      ],
    ],
    preview:
      "Platform in development. Applications and registration are not connected yet.",
    explore: "Choose a mood",
    footer: "Individual design. A clear process.",
  },
  ka: {
    tag: "ვებდიზაინი და დეველოპმენტი · საქართველო",
    title: "თქვენი ბიზნესი.",
    accent: "მისი ციფრული ხასიათი.",
    intro:
      "ინდივიდუალური საიტები, სადაც სილამაზე საქმეს ემსახურება. წარადგინეთ მომსახურება და დაეხმარეთ მომხმარებელს თქვენთან დაკავშირებაში.",
    primary: "ჩემი საიტის შეფასება",
    secondary: "კონცეფციების ნახვა",
    note: "პირველი იდეიდან გაშვებამდე და მართვის გადაცემამდე.",
    collection: "01 / მიმართულებები",
    works: "განსხვავებული ბიზნესი. განსხვავებული განწყობა.",
    workIntro:
      "სამი დამოუკიდებელი ინტერაქტიული დემონსტრაცია. ეს კონცეფციებია და არა შესრულებული კლიენტების შეკვეთები.",
    types: ["კაფე და რესტორანი", "სილამაზე და მოვლა", "ავეჯი და ინტერიერი"],
    captions: [
      "თბილი შუქი. ცოცხალი შეხვედრები.",
      "სივრცე საკუთარი თავისთვის.",
      "ნაკლები ნივთი. მეტი აზრი.",
    ],
    details: [
      "მენიუ, დაჯავშნა, რუკა",
      "მომსახურება, სპეციალისტები, ჩაწერა",
      "კატალოგი, მასალები, კალათა",
    ],
    concept: "ვიზუალური ესკიზი",
    processTag: "02 / თანამშრომლობა",
    process: "გასაგებია ყოველ ეტაპზე.",
    steps: [
      [
        "გავიცნოთ თქვენი ამოცანა",
        "გვიამბეთ ბიზნესის, სასურველი სტილისა და ფუნქციების შესახებ.",
      ],
      [
        "შევთანხმდეთ გადაწყვეტაზე",
        "განვიხილოთ კონცეფცია, სამუშაოს მოცულობა, ვადები, ფასი და შესწორებები.",
      ],
      [
        "შევქმნათ და დავაზუსტოთ",
        "შეამოწმეთ წინასწარი ვერსია და გაგვიზიარეთ შენიშვნები.",
      ],
      [
        "გადმოგცეთ შედეგი",
        "მიღებისა და გადახდის დადასტურების შემდეგ — გაშვება, წვდომები და ინსტრუქცია.",
      ],
    ],
    priceTag: "03 / ღირებულება",
    price: "გასაგები სამუშაოს მოცულობა.",
    priceBody:
      "დიზაინი, დეველოპმენტი, მასალები, ინტეგრაციები, შემოწმება და გაშვება ხარჯთაღრიცხვის ცალკეული ნაწილებია. პერიოდული ხარჯები ცალკე ჩანს. საბოლოო ფასი წინასწარ თანხმდება.",
    priceNote:
      "შეფასების სისტემა მზადდება. სტუდიის ტარიფები ჯერ არ არის განსაზღვრული.",
    reviews: "ნამდვილი შეფასებები რეალური პროექტების შემდეგ.",
    reviewBody:
      "დადასტურებული შეფასებები ჯერ არ გვაქვს. დასრულებული შეკვეთის შემდეგ მომხმარებელი შეძლებს გამოცდილების გაზიარებას.",
    faq: "დაწყებამდე",
    questions: [
      [
        "როდის გადავიხდი?",
        "ძირითადი სცენარია გადახდა ნახვის, შეთანხმებული შესწორებებისა და შედეგის მიღების შემდეგ. პირობებს წინასწარ ვათანხმებთ.",
      ],
      [
        "შევძლებ საიტის მართვას?",
        "შეთანხმებულ მოცულობაში შედის საჭირო რედაქტირება, ადმინისტრაციული წვდომა და ინსტრუქცია.",
      ],
      [
        "საიტი უკვე მაქვს",
        "შეგვიძლია განვიხილოთ განახლება ან გადატანა, არსებული საიტისა და მოთხოვნების შეფასების შემდეგ.",
      ],
      [
        "რა პერიოდული ხარჯებია?",
        "დომენი, ჰოსტინგი და არჩეული გარე სერვისები. ხარჯები შეთანხმებამდე უნდა დაზუსტდეს.",
      ],
    ],
    preview:
      "პლატფორმა მზადების პროცესშია. განაცხადები და რეგისტრაცია ჯერ არ არის დაკავშირებული.",
    explore: "აირჩიეთ განწყობა",
    footer: "ინდივიდუალური დიზაინი. გასაგები პროცესი.",
  },
};
export function useStudioCopy() {
  const { lang } = useI18n();
  return copy[lang];
}
const names = ["Mzi", "Serein", "Forma"];
const routes = ["cafe", "beauty", "interior"];
export function ConceptArt({ index }: { index: number }) {
  return (
    <div className={`concept-art art-${index}`} aria-hidden="true">
      <span>{names[index]}</span>
      <div className="art-object">
        <i />
        <b />
      </div>
      <small>0{index + 1} / CONCEPT</small>
    </div>
  );
}
export function ConceptGallery() {
  const c = useStudioCopy();
  return (
    <section className="studio-section" id="works">
      <p className="eyebrow">{c.collection}</p>
      <h2>{c.works}</h2>
      <p className="section-intro">{c.workIntro}</p>
      <div className="concept-grid">
        {names.map((name, i) => (
          <article key={name}>
            <ConceptArt index={i} />
            <div className="concept-caption">
              <div>
                <p className="eyebrow">{c.concept}</p>
                <h3>{c.types[i]}</h3>
                <p>{c.details[i]}</p>
              </div>
              <Link
                href={"/demo/" + routes[i]}
                className="text-link"
                aria-label={c.types[i] + " — demo"}
              >
                ↗
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default function Home() {
  const c = useStudioCopy();
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className="preview-note">{c.preview}</div>
      <section className="studio-hero studio-section">
        <div>
          <p className="eyebrow">{c.tag}</p>
          <h1>
            {c.title}
            <br />
            <em>{c.accent}</em>
          </h1>
          <p className="hero-intro">{c.intro}</p>
          <div className="hero-actions">
            <Link href="/create" className="studio-button">
              {c.primary}
              <ArrowUpRight size={19} />
            </Link>
            <a href="#works" className="text-link">
              {c.secondary}
              <ArrowRight size={18} />
            </a>
          </div>
          <p className="hero-note">{c.note}</p>
        </div>
        <div className="hero-showcase">
          <div className="showcase-top">
            <span>{c.concept}</span>
            <span>↗</span>
          </div>
          <ConceptArt index={selected} />
          <p className="showcase-caption">{c.captions[selected]}</p>
          <div className="mood-switch" role="group" aria-label={c.explore}>
            {names.map((n, i) => (
              <button
                key={n}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>
      <ConceptGallery />
      <section id="process" className="studio-section">
        <p className="eyebrow">{c.processTag}</p>
        <h2>{c.process}</h2>
        <div className="process-grid">
          {c.steps.map(([title, text], i) => (
            <article key={title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pricing-section studio-section">
        <div>
          <p className="eyebrow">{c.priceTag}</p>
          <h2>{c.price}</h2>
        </div>
        <div>
          <p>{c.priceBody}</p>
          <p className="price-note">{c.priceNote}</p>
        </div>
      </section>
      <section id="reviews" className="studio-section reviews-section">
        <span className="review-symbol" aria-hidden="true">
          “
        </span>
        <h2>{c.reviews}</h2>
        <p>{c.reviewBody}</p>
      </section>
      <section className="studio-section faq-section">
        <h2>{c.faq}</h2>
        <div>
          {c.questions.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
