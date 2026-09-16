import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useBrief } from "@/lib/brief";
import { Link } from "wouter";
type Words = [string, string, string];
const steps: Words[] = [
  ["Бизнес", "Business", "ბიზნესი"],
  ["Стиль", "Style", "სტილი"],
  ["Структура", "Structure", "სტრუქტურა"],
  ["Материалы", "Materials", "მასალები"],
  ["Бюджет и сроки", "Budget & timing", "ბიუჯეტი და ვადები"],
  ["Итог", "Summary", "შეჯამება"],
];
const labels: Record<string, Words> = {
  business: ["Название бизнеса", "Business name", "ბიზნესის სახელი"],
  industry: ["Сфера", "Industry", "სფერო"],
  audience: ["Аудитория", "Audience", "აუდიტორია"],
  geography: ["География", "Geography", "გეოგრაფია"],
  project: ["Тип проекта", "Project type", "პროექტის ტიპი"],
  goals: ["Цели", "Goals", "მიზნები"],
  style: ["Стиль", "Style", "სტილი"],
  colors: ["Цвета", "Colors", "ფერები"],
  fonts: ["Шрифты и настроение", "Typography and mood", "შრიფტები და განწყობა"],
  interface: ["Интерфейс", "Interface", "ინტერფეისი"],
  referenceMode: [
    "Использование примеров",
    "Reference approach",
    "მაგალითების გამოყენება",
  ],
  keep: ["Сохранить", "Keep", "შევინარჩუნოთ"],
  change: ["Изменить", "Change", "შევცვალოთ"],
  externalReferences: [
    "Внешние примеры",
    "External references",
    "გარე მაგალითები",
  ],
  pages: ["Разделы", "Pages", "გვერდები"],
  features: ["Функции", "Features", "ფუნქციები"],
  otherPages: ["Дополнения", "Other requirements", "დამატებითი მოთხოვნები"],
  languages: ["Языки сайта", "Website languages", "საიტის ენები"],
  socials: ["Каналы", "Channels", "არხები"],
  socialMode: [
    "Подключение каналов",
    "Channel connections",
    "არხების დაკავშირება",
  ],
  materials: ["Материалы", "Materials", "მასალები"],
  existingUrl: ["Текущий сайт", "Existing website", "არსებული საიტი"],
  help: ["Помощь", "Assistance", "დახმარება"],
  budget: ["Бюджет", "Budget", "ბიუჯეტი"],
  deadline: ["Дата запуска", "Launch date", "გაშვების თარიღი"],
  flexible: ["Гибкость срока", "Date flexibility", "ვადის მოქნილობა"],
  notes: ["Пожелания", "Notes", "სურვილები"],
};
export default function CreateWizard() {
  const { lang } = useI18n();
  const tr = (w: Words) => w[lang === "ru" ? 0 : lang === "en" ? 1 : 2];
  const { brief, saved, value, toggle, reference } = useBrief();
  const [step, setStep] = useState(0);
  const field = (id: string, label: Words, multiline = false) => (
    <label className="brief-field" key={id}>
      {tr(label)}
      {multiline ? (
        <textarea
          rows={3}
          value={brief.values[id] || ""}
          onChange={(e) => value(id, e.target.value)}
        />
      ) : (
        <input
          value={brief.values[id] || ""}
          onChange={(e) => value(id, e.target.value)}
        />
      )}
    </label>
  );
  const options = (
    id: string,
    label: Words,
    items: [string, Words][],
    single = false,
  ) => (
    <fieldset className="brief-options">
      <legend>{tr(label)}</legend>
      {items.map(([v, w]) => (
        <label key={v}>
          <input
            type={single ? "radio" : "checkbox"}
            name={id}
            checked={
              single
                ? brief.values[id] === v
                : (brief.selections[id] || []).includes(v)
            }
            onChange={() => (single ? value(id, v) : toggle(id, v))}
          />
          {tr(w)}
        </label>
      ))}
    </fieldset>
  );
  const unknown: [string, Words] = [
    "help",
    ["Не знаю — помогите выбрать", "Help me choose", "დამეხმარეთ არჩევაში"],
  ];
  return (
    <section className="studio-section">
      <p className="eyebrow">
        {tr([
          "ВАШ БУДУЩИЙ САЙТ",
          "YOUR FUTURE WEBSITE",
          "თქვენი მომავალი საიტი",
        ])}
      </p>
      <h1 className="text-4xl md:text-5xl mb-5">
        {tr([
          "Начнём с вашей идеи.",
          "Let’s start with your idea.",
          "დავიწყოთ თქვენი იდეით.",
        ])}
      </h1>
      <p className="max-w-2xl leading-7 mb-8">
        {tr([
          "Это черновик в вашем браузере. Он не отправляется команде. Регистрация и приём заявок ещё подключаются.",
          "This is a draft in your browser, not a submitted application. Accounts and application delivery are not connected yet.",
          "ეს თქვენს ბრაუზერში შენახული მონახაზია და გუნდს არ ეგზავნება. რეგისტრაცია და განაცხადები ჯერ არ არის დაკავშირებული.",
        ])}
      </p>
      <ol className="brief-steps">
        {steps.map((w, i) => (
          <li key={i}>
            <button
              onClick={() => setStep(i)}
              aria-current={step === i ? "step" : undefined}
            >
              {i + 1}. {tr(w)}
            </button>
          </li>
        ))}
      </ol>
      <div className="brief-layout">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep((s) => Math.min(5, s + 1));
          }}
        >
          <h2 className="!text-3xl mb-6">{tr(steps[step])}</h2>
          {step === 0 && (
            <>
              {field("business", [
                "Название бизнеса",
                "Business name",
                "ბიზნესის სახელი",
              ])}
              {field("industry", [
                "Чем вы занимаетесь?",
                "What does your business do?",
                "რას საქმიანობთ?",
              ])}
              {field("audience", [
                "Для кого ваш сайт?",
                "Who is your audience?",
                "ვისთვისაა საიტი?",
              ])}
              {field("geography", [
                "Город и страны клиентов",
                "Customer cities and countries",
                "მომხმარებლების ქალაქები და ქვეყნები",
              ])}
              {options(
                "project",
                ["Тип проекта", "Project type", "პროექტის ტიპი"],
                [
                  ["new", ["Новый сайт", "New website", "ახალი საიტი"]],
                  ["redesign", ["Редизайн", "Redesign", "განახლება"]],
                  ["migration", ["Перенос", "Migration", "გადატანა"]],
                  unknown,
                ],
                true,
              )}
              {options(
                "goals",
                ["Цели сайта", "Website goals", "საიტის მიზნები"],
                [
                  [
                    "leads",
                    ["Получать заявки", "Get inquiries", "განაცხადები"],
                  ],
                  ["sales", ["Продавать", "Sell products", "გაყიდვები"]],
                  [
                    "booking",
                    ["Принимать записи", "Take appointments", "ჩაწერა"],
                  ],
                  [
                    "presentation",
                    [
                      "Показывать бизнес",
                      "Present the business",
                      "ბიზნესის წარდგენა",
                    ],
                  ],
                  unknown,
                ],
              )}
            </>
          )}
          {step === 1 && (
            <>
              {options(
                "style",
                ["Визуальный стиль", "Visual style", "ვიზუალური სტილი"],
                [
                  [
                    "minimal",
                    [
                      "Спокойный минимализм",
                      "Calm minimalism",
                      "მშვიდი მინიმალიზმი",
                    ],
                  ],
                  ["business", ["Строгий деловой", "Professional", "საქმიანი"]],
                  [
                    "expressive",
                    [
                      "Яркий выразительный",
                      "Bold and expressive",
                      "ნათელი და გამომსახველი",
                    ],
                  ],
                  [
                    "cozy",
                    ["Тёплый уютный", "Warm and cozy", "თბილი და მყუდრო"],
                  ],
                  unknown,
                ],
                true,
              )}
              {field("colors", ["Цвета", "Colors", "ფერები"])}
              {field("fonts", [
                "Шрифты и настроение",
                "Typography and mood",
                "შრიფტები და განწყობა",
              ])}
              {field(
                "interface",
                [
                  "Навигация, расположение блоков, анимации",
                  "Navigation, layout and animation",
                  "ნავიგაცია, განლაგება და ანიმაცია",
                ],
                true,
              )}
              <p className="mb-4">
                {tr([
                  "Референсы из наших демонстраций",
                  "References from our demonstrations",
                  "მაგალითები ჩვენი დემონსტრაციებიდან",
                ])}
              </p>
              {["cafe", "beauty", "interior"].map((r, i) => (
                <label key={r} className="brief-reference">
                  <input
                    type="checkbox"
                    checked={brief.references.includes(r)}
                    onChange={() => reference(r)}
                  />
                  {["Mzi / Cafe", "Serein / Beauty", "Forma / Interior"][i]}
                  <Link href={"/demo/" + r}>↗</Link>
                </label>
              ))}
              {field("referenceMode", [
                "Похожий стиль или взять за основу и изменить?",
                "Similar style or use as a base and change?",
                "მსგავსი სტილი თუ საფუძვლად აღება და შეცვლა?",
              ])}
              {field(
                "keep",
                [
                  "Что сохранить: цвета, шрифты, блоки, интерфейс, анимации, каталог?",
                  "What to keep: colors, fonts, layout, interface, animation, catalog?",
                  "რა შევინარჩუნოთ: ფერები, შრიფტები, განლაგება, ინტერფეისი, ანიმაცია, კატალოგი?",
                ],
                true,
              )}
              {field(
                "change",
                ["Что изменить?", "What should change?", "რა შევცვალოთ?"],
                true,
              )}
              {field(
                "externalReferences",
                [
                  "Ссылки на другие примеры",
                  "Other reference URLs",
                  "სხვა მაგალითების ბმულები",
                ],
                true,
              )}
            </>
          )}
          {step === 2 && (
            <>
              {options(
                "pages",
                ["Нужные разделы", "Pages you need", "საჭირო გვერდები"],
                [
                  ["home", ["Главная", "Home", "მთავარი"]],
                  ["services", ["Услуги", "Services", "მომსახურება"]],
                  ["catalog", ["Каталог", "Catalog", "კატალოგი"]],
                  [
                    "products",
                    ["Карточки товаров", "Product pages", "პროდუქტის გვერდები"],
                  ],
                  ["team", ["Команда", "Team", "გუნდი"]],
                  ["reviews", ["Отзывы", "Reviews", "შეფასებები"]],
                  ["contact", ["Контакты", "Contact", "კონტაქტი"]],
                  unknown,
                ],
              )}
              {options(
                "features",
                [
                  "Функции будущего сайта",
                  "Features of your commissioned website",
                  "შესაკვეთ საიტის ფუნქციები",
                ],
                [
                  ["search", ["Поиск", "Search", "ძიება"]],
                  ["filters", ["Фильтры", "Filters", "ფილტრები"]],
                  ["forms", ["Формы", "Forms", "ფორმები"]],
                  ["booking", ["Бронирование", "Booking", "დაჯავშნა"]],
                  ["cart", ["Корзина", "Cart", "კალათა"]],
                  [
                    "payments",
                    ["Онлайн-оплата", "Online payments", "ონლაინ გადახდა"],
                  ],
                  [
                    "accounts",
                    [
                      "Аккаунты посетителей",
                      "Visitor accounts",
                      "ვიზიტორების ანგარიშები",
                    ],
                  ],
                  unknown,
                ],
              )}
              {field(
                "otherPages",
                [
                  "Другие страницы и функции",
                  "Other pages and features",
                  "სხვა გვერდები და ფუნქციები",
                ],
                true,
              )}
              {options(
                "languages",
                [
                  "Языки вашего будущего сайта",
                  "Languages of your future website",
                  "თქვენი მომავალი საიტის ენები",
                ],
                [
                  ["ka", ["Грузинский", "Georgian", "ქართული"]],
                  ["ru", ["Русский", "Russian", "რუსული"]],
                  ["en", ["Английский", "English", "ინგლისური"]],
                  unknown,
                ],
              )}
              {options(
                "socials",
                ["Каналы связи", "Contact channels", "საკონტაქტო არხები"],
                ["Facebook", "Instagram", "Telegram", "WhatsApp", "Viber"].map(
                  (v) => [v, [v, v, v]],
                ),
              )}
              {options(
                "socialMode",
                [
                  "Как подключить каналы?",
                  "How should channels connect?",
                  "როგორ დავაკავშიროთ არხები?",
                ],
                [
                  [
                    "links",
                    [
                      "Ссылки на профили",
                      "Profile links",
                      "პროფილების ბმულები",
                    ],
                  ],
                  [
                    "buttons",
                    ["Кнопки связи", "Contact buttons", "საკონტაქტო ღილაკები"],
                  ],
                  [
                    "integration",
                    [
                      "Сложная интеграция",
                      "Advanced integration",
                      "რთული ინტეგრაცია",
                    ],
                  ],
                  unknown,
                ],
              )}
            </>
          )}
          {step === 3 && (
            <>
              {options(
                "materials",
                [
                  "Что уже есть?",
                  "What do you already have?",
                  "რა გაქვთ უკვე?",
                ],
                [
                  ["logo", ["Логотип", "Logo", "ლოგო"]],
                  ["photos", ["Фотографии", "Photos", "ფოტოები"]],
                  ["text", ["Тексты", "Text", "ტექსტები"]],
                  ["domain", ["Домен", "Domain", "დომენი"]],
                  ["website", ["Сайт", "Website", "საიტი"]],
                  unknown,
                ],
              )}
              {field("existingUrl", [
                "Адрес существующего сайта",
                "Existing website URL",
                "არსებული საიტის მისამართი",
              ])}
              {options(
                "help",
                [
                  "С чем нужна помощь?",
                  "Where do you need help?",
                  "რაში გჭირდებათ დახმარება?",
                ],
                [
                  [
                    "copy",
                    ["Написать тексты", "Write copy", "ტექსტების დაწერა"],
                  ],
                  [
                    "images",
                    [
                      "Подобрать изображения",
                      "Choose images",
                      "სურათების შერჩევა",
                    ],
                  ],
                  [
                    "content",
                    ["Наполнить сайт", "Add content", "საიტის შევსება"],
                  ],
                  [
                    "setup",
                    [
                      "Настроить сервисы",
                      "Configure services",
                      "სერვისების გამართვა",
                    ],
                  ],
                  unknown,
                ],
              )}
            </>
          )}
          {step === 4 && (
            <>
              {field("budget", [
                "Желаемый бюджет и валюта",
                "Budget range and currency",
                "ბიუჯეტი და ვალუტა",
              ])}
              <label className="brief-field">
                {tr([
                  "Желаемая дата запуска",
                  "Preferred launch date",
                  "სასურველი გაშვების თარიღი",
                ])}
                <input
                  type="date"
                  value={brief.values.deadline || ""}
                  onChange={(e) => value("deadline", e.target.value)}
                />
              </label>
              {options(
                "flexible",
                [
                  "Можно ли изменить дату?",
                  "Is the date flexible?",
                  "შესაძლებელია თარიღის შეცვლა?",
                ],
                [
                  ["yes", ["Да", "Yes", "დიახ"]],
                  ["no", ["Нет", "No", "არა"]],
                  unknown,
                ],
                true,
              )}
              {field(
                "notes",
                [
                  "Расскажите о пожеланиях",
                  "Anything else we should know?",
                  "დამატებითი სურვილები",
                ],
                true,
              )}
            </>
          )}
          {step === 5 && (
            <>
              <p className="mb-5">
                {tr([
                  "Черновик подготовлен. Проверьте параметры и сохраните копию. Заявка ещё не отправлена.",
                  "Draft prepared. Review the details and save a copy. Your application has not been sent.",
                  "მონახაზი მზადაა. შეამოწმეთ პარამეტრები და შეინახეთ ასლი. განაცხადი არ გაგზავნილა.",
                ])}
              </p>
              <dl className="brief-summary">
                {Object.entries(brief.values)
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt>{labels[k] ? tr(labels[k]) : k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                {Object.entries(brief.selections)
                  .filter(([, v]) => v.length)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt>{labels[k] ? tr(labels[k]) : k}</dt>
                      <dd>{v.join(", ")}</dd>
                    </div>
                  ))}
                <div>
                  <dt>{tr(["Референсы", "References", "მაგალითები"])}</dt>
                  <dd>{brief.references.join(", ") || "—"}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="studio-button mt-6"
                onClick={() => {
                  const url = URL.createObjectURL(
                    new Blob([JSON.stringify(brief, null, 2)], {
                      type: "application/json",
                    }),
                  );
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "website-brief.json";
                  a.click();
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
              >
                {tr([
                  "Скачать черновик",
                  "Download draft",
                  "მონახაზის ჩამოტვირთვა",
                ])}
              </button>
            </>
          )}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              className="text-link"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              {tr(["Назад", "Back", "უკან"])}
            </button>
            {step < 5 && (
              <button className="studio-button" type="submit">
                {tr(["Далее", "Next", "შემდეგი"])} →
              </button>
            )}
          </div>
        </form>
        <aside className="brief-aside">
          <h3>{tr(["Ваш проект", "Your project", "თქვენი პროექტი"])}</h3>
          <p>{brief.values.business || "—"}</p>
          <hr />
          <p>
            {tr(["Выбрано разделов", "Selected pages", "არჩეული გვერდები"])}:{" "}
            {(brief.selections.pages || []).filter((x) => x !== "help").length}
          </p>
          <p>
            {tr(["Выбрано функций", "Selected features", "არჩეული ფუნქციები"])}:{" "}
            {
              (brief.selections.features || []).filter((x) => x !== "help")
                .length
            }
          </p>
          <p>
            {tr(["Референсы", "References", "მაგალითები"])}:{" "}
            {brief.references.length}
          </p>
          <hr />
          <strong>
            {tr([
              "Стоимость требует оценки",
              "Price requires assessment",
              "ფასი შესაფასებელია",
            ])}
          </strong>
          <p>
            {tr([
              "Ставки и правила расчёта ещё не настроены. Бюджет помогает выбрать объём, но не меняет цену одинаковой работы.",
              "Rates and estimation rules are not configured. Your budget informs scope, not the price of identical work.",
              "ტარიფები და შეფასების წესები ჯერ არ არის განსაზღვრული. ბიუჯეტი განსაზღვრავს მოცულობას და არა იდენტური სამუშაოს ფასს.",
            ])}
          </p>
          <p role="status">
            {saved
              ? tr([
                  "Черновик хранится в этом браузере",
                  "Draft stored in this browser",
                  "მონახაზი ინახება ამ ბრაუზერში",
                ])
              : tr([
                  "Не удалось сохранить. Скачайте копию на последнем шаге.",
                  "Could not save. Download a copy on the final step.",
                  "შენახვა ვერ მოხერხდა. ჩამოტვირთეთ ასლი ბოლო ეტაპზე.",
                ])}
          </p>
        </aside>
      </div>
    </section>
  );
}
