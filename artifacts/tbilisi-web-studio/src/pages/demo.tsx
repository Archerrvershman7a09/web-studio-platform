import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { useBrief } from "@/lib/brief";
import { ConceptArt } from "./home";
const products = [
  {
    id: "chair",
    name: ["Стул Arc", "Arc chair", "სკამი Arc"],
    category: "chairs",
    price: 180,
  },
  {
    id: "table",
    name: ["Стол Line", "Line table", "მაგიდა Line"],
    category: "tables",
    price: 420,
  },
  {
    id: "lamp",
    name: ["Лампа Halo", "Halo lamp", "სანათი Halo"],
    category: "lighting",
    price: 95,
  },
];
export default function Demo({
  kind,
}: {
  kind: "cafe" | "beauty" | "interior";
}) {
  const { lang } = useI18n();
  const l = lang === "ru" ? 0 : lang === "en" ? 1 : 2;
  const t = (ru: string, en: string, ka: string) => [ru, en, ka][l];
  const index = kind === "cafe" ? 0 : kind === "beauty" ? 1 : 2;
  const { brief, reference } = useBrief();
  const [, navigate] = useLocation();
  const [filter, setFilter] = useState("all");
  const [done, setDone] = useState(false);
  const [material, setMaterial] = useState("oak");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const total = Object.entries(cart).reduce(
    (sum, [key, qty]) =>
      sum +
      (products.find((p) => p.id === key.split(":")[0])?.price || 0) * qty,
    0,
  );
  const title =
    kind === "cafe"
      ? t(
          "Замедлиться. Остаться на кофе.",
          "Slow down. Stay for coffee.",
          "შეანელეთ. დარჩით ყავაზე.",
        )
      : kind === "beauty"
        ? t(
            "Время, посвящённое себе.",
            "A moment for yourself.",
            "დრო საკუთარი თავისთვის.",
          )
        : t(
            "Вещи, с которыми хочется жить.",
            "Objects to live with.",
            "ნივთები ყოველდღიური ცხოვრებისთვის.",
          );
  const name = ["Mzi", "Serein", "Forma"][index];
  return (
    <div className={`demo-shell demo-${kind}`}>
      <div className="demo-notice">
        {t(
          "Демонстрационная концепция. Названия, товары, цены и действия — примеры. Заказы, записи и платежи не создаются.",
          "Demonstration concept. Names, products, prices and interactions are samples. No orders, appointments or payments are created.",
          "სადემონსტრაციო კონცეფცია. სახელები, პროდუქტები, ფასები და მოქმედებები მაგალითებია. შეკვეთები, ჩაწერები და გადახდები არ იქმნება.",
        )}
      </div>
      <nav className="demo-nav">
        <Link href="/works">
          ← {t("Все работы", "All work", "ყველა ნამუშევარი")}
        </Link>
        <strong>{name}</strong>
        <button
          onClick={() => {
            if (!brief.references.includes(kind)) reference(kind);
            navigate("/create");
          }}
        >
          {t("Хочу похожее", "I want something similar", "მსგავსი მინდა")} ↗
        </button>
      </nav>
      <section className="demo-hero">
        <div>
          <p className="eyebrow">
            {name} / {t("КОНЦЕПЦИЯ", "CONCEPT", "კონცეფცია")}
          </p>
          <h1>{title}</h1>
          <p>
            {kind === "cafe"
              ? t(
                  "Сезонное меню, любимый столик и простые поводы встретиться.",
                  "Seasonal flavors, your favorite table and a reason to meet.",
                  "სეზონური მენიუ, საყვარელი მაგიდა და შეხვედრის მიზეზი.",
                )
              : kind === "beauty"
                ? t(
                    "Понятный выбор услуг и удобная запись в несколько шагов.",
                    "A considered service menu and an easy appointment flow.",
                    "მომსახურების გასაგები არჩევანი და მარტივი ჩაწერა.",
                  )
                : t(
                    "Тактильные материалы. Спокойные формы. Продуманные детали.",
                    "Tactile materials. Quiet forms. Thoughtful details.",
                    "ტაქტილური მასალები. მშვიდი ფორმები. გააზრებული დეტალები.",
                  )}
          </p>
          <a href="#demo-content" className="studio-button">
            {t("Посмотреть", "Explore", "ნახვა")} ↓
          </a>
        </div>
        <ConceptArt index={index} />
      </section>
      <section id="demo-content" className="demo-content">
        {kind === "interior" ? (
          <>
            <h2>{t("Коллекция", "The collection", "კოლექცია")}</h2>
            <div
              className="demo-filters"
              role="group"
              aria-label={t("Категории", "Categories", "კატეგორიები")}
            >
              {[
                ["all", t("Всё", "All", "ყველა")],
                ["chairs", t("Стулья", "Chairs", "სკამები")],
                ["tables", t("Столы", "Tables", "მაგიდები")],
                ["lighting", t("Свет", "Lighting", "განათება")],
              ].map(([id, label]) => (
                <button
                  key={id}
                  aria-pressed={filter === id}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="product-grid">
              {products
                .filter((p) => filter === "all" || p.category === filter)
                .map((p, i) => (
                  <article key={p.id}>
                    <div
                      className={"product-art product-" + p.id}
                      aria-hidden="true"
                    >
                      <i />
                      <b />
                    </div>
                    <h3>{p.name[l]}</h3>
                    <p>
                      {p.price} ₾ ·{" "}
                      {t("демо-цена", "sample price", "სადემო ფასი")}
                    </p>
                    <button
                      className="text-link"
                      onClick={() =>
                        setSelected(selected === p.id ? null : p.id)
                      }
                      aria-expanded={selected === p.id}
                    >
                      {t(
                        "Материалы и детали",
                        "Materials & details",
                        "მასალები და დეტალები",
                      )}{" "}
                      +
                    </button>
                    {selected === p.id && (
                      <div className="product-detail">
                        <label>
                          {t("Материал", "Material", "მასალა")}
                          <select
                            className="demo-field"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                          >
                            <option value="oak">
                              {t("Светлый дуб", "Light oak", "ღია მუხა")}
                            </option>
                            <option value="walnut">
                              {t("Тёмный орех", "Dark walnut", "მუქი კაკალი")}
                            </option>
                          </select>
                        </label>
                        <p>
                          {t(
                            "Учебная карточка товара: выбранный вариант сохраняется в демо-корзине.",
                            "Sample product page: your chosen variant is kept in the demo cart.",
                            "სასწავლო ბარათი: არჩეული ვარიანტი ინახება სადემო კალათაში.",
                          )}
                        </p>
                        <button
                          className="studio-button"
                          onClick={() =>
                            setCart((c) => ({
                              ...c,
                              [p.id + ":" + material]:
                                (c[p.id + ":" + material] || 0) + 1,
                            }))
                          }
                        >
                          {t(
                            "В демо-корзину",
                            "Add to demo cart",
                            "სადემო კალათაში",
                          )}
                        </button>
                      </div>
                    )}
                  </article>
                ))}
            </div>
            <section className="demo-cart" aria-live="polite">
              <h3>{t("Демо-корзина", "Demo cart", "სადემო კალათა")}</h3>
              {!Object.keys(cart).length && (
                <p>
                  {t(
                    "Здесь пока пусто",
                    "Your cart is empty",
                    "კალათა ცარიელია",
                  )}
                </p>
              )}
              {Object.entries(cart).map(([key, qty]) => (
                <div key={key}>
                  {products.find((p) => p.id === key.split(":")[0])?.name[l]} ·{" "}
                  {key.endsWith("oak")
                    ? t("Дуб", "Oak", "მუხა")
                    : t("Орех", "Walnut", "კაკალი")}{" "}
                  × {qty}
                  <button
                    onClick={() =>
                      setCart((c) => {
                        const next = { ...c };
                        delete next[key];
                        return next;
                      })
                    }
                  >
                    {t("Удалить", "Remove", "წაშლა")}
                  </button>
                </div>
              ))}
              <strong>
                {t("Итого", "Total", "ჯამი")}: {total} ₾
              </strong>
              <p>
                {t(
                  "Демонстрация расчёта. Оформление заказа и оплата отключены.",
                  "Calculation demo. Checkout and payments are disabled.",
                  "გამოთვლის დემონსტრაცია. შეკვეთა და გადახდა გამორთულია.",
                )}
              </p>
            </section>
          </>
        ) : (
          <>
            <h2>
              {kind === "cafe"
                ? t("На вашем столе", "On your table", "თქვენს მაგიდაზე")
                : t(
                    "Выберите свой ритуал",
                    "Choose your ritual",
                    "აირჩიეთ თქვენი რიტუალი",
                  )}
            </h2>
            {kind === "cafe" && (
              <div className="demo-filters">
                {[
                  ["all", t("Всё меню", "Full menu", "სრული მენიუ")],
                  ["food", t("Завтраки", "Breakfast", "საუზმე")],
                  ["drink", t("Напитки", "Drinks", "სასმელები")],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    aria-pressed={filter === id}
                    onClick={() => setFilter(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            <div className="service-list">
              {(kind === "cafe"
                ? [
                    [
                      "food",
                      t("Тост с томатами", "Tomato toast", "ტოსტი პომიდვრით"),
                      "18",
                    ],
                    [
                      "food",
                      t(
                        "Гранола с йогуртом",
                        "Granola & yogurt",
                        "გრანოლა იოგურტით",
                      ),
                      "16",
                    ],
                    ["drink", t("Капучино", "Cappuccino", "კაპუჩინო"), "9"],
                    [
                      "drink",
                      t("Домашний лимонад", "House lemonade", "ლიმონათი"),
                      "12",
                    ],
                  ]
                : [
                    [
                      "all",
                      t(
                        "Стрижка и укладка",
                        "Haircut & styling",
                        "შეჭრა და ვარცხნილობა",
                      ),
                      "65",
                    ],
                    ["all", t("Укладка", "Styling", "ვარცხნილობა"), "40"],
                    ["all", t("Маникюр", "Manicure", "მანიკური"), "45"],
                  ]
              )
                .filter(([category]) => filter === "all" || filter === category)
                .map(([, label, price]) => (
                  <article key={label}>
                    <h3>{label}</h3>
                    <span>{price} ₾</span>
                  </article>
                ))}
            </div>
            <p className="text-xs mt-4">
              {t(
                "Все цены условные и используются только для демонстрации.",
                "All prices are illustrative and used only for this demonstration.",
                "ყველა ფასი პირობითია და მხოლოდ დემონსტრაციისთვის გამოიყენება.",
              )}
            </p>
            <div className="demo-booking">
              <div>
                <h2>
                  {kind === "cafe"
                    ? t(
                        "Ваш столик ждёт.",
                        "Your table awaits.",
                        "თქვენი მაგიდა გელით.",
                      )
                    : t(
                        "Выберите удобное время.",
                        "Make time for yourself.",
                        "აირჩიეთ მოსახერხებელი დრო.",
                      )}
                </h2>
                <p>
                  {t(
                    "Попробуйте форму. Никакие данные никуда не отправляются.",
                    "Try the form. No information is sent anywhere.",
                    "გამოსცადეთ ფორმა. მონაცემები არსად იგზავნება.",
                  )}
                </p>
                {kind === "beauty" && (
                  <p>
                    {t(
                      "Мастера A и B — демонстрационные профили для проверки выбора специалиста.",
                      "Specialists A and B are demo profiles for testing the selection flow.",
                      "სპეციალისტები A და B სადემონსტრაციო პროფილებია.",
                    )}
                  </p>
                )}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <label>
                  {t("Дата", "Date", "თარიღი")}
                  <input type="date" required className="demo-field" />
                </label>
                <label>
                  {t("Время", "Time", "დრო")}
                  <select className="demo-field">
                    <option>10:00</option>
                    <option>12:00</option>
                    <option>16:00</option>
                  </select>
                </label>
                <label>
                  {kind === "cafe"
                    ? t("Гостей", "Guests", "სტუმრები")
                    : t("Специалист", "Specialist", "სპეციალისტი")}
                  <select className="demo-field">
                    {(kind === "cafe" ? ["1", "2", "3", "4"] : ["A", "B"]).map(
                      (x) => (
                        <option key={x}>{x}</option>
                      ),
                    )}
                  </select>
                </label>
                {kind === "beauty" && (
                  <label>
                    {t("Услуга", "Service", "მომსახურება")}
                    <select className="demo-field">
                      <option>{t("Стрижка", "Haircut", "შეჭრა")}</option>
                      <option>{t("Укладка", "Styling", "ვარცხნილობა")}</option>
                      <option>{t("Маникюр", "Manicure", "მანიკური")}</option>
                    </select>
                  </label>
                )}
                <button className="studio-button">
                  {t(
                    "Проверить демо-запись",
                    "Try demo booking",
                    "სადემო ჩაწერის შემოწმება",
                  )}
                </button>
                {done && (
                  <p role="status">
                    {t(
                      "Демо пройдено. Настоящая запись не создана.",
                      "Demo complete. No real reservation was created.",
                      "დემო დასრულდა. რეალური ჯავშანი არ შექმნილა.",
                    )}
                  </p>
                )}
              </form>
            </div>
            {kind === "cafe" && (
              <div className="demo-map">
                <div aria-hidden="true">
                  ＋<span>● Mzi</span>＋
                </div>
                <p>
                  {t(
                    "Схема расположения — демонстрация блока карты. Реальный адрес не указан.",
                    "Location diagram: a map block demonstration. No real address is specified.",
                    "მდებარეობის სქემა — რუკის ბლოკის დემონსტრაცია. რეალური მისამართი მითითებული არ არის.",
                  )}
                </p>
              </div>
            )}
          </>
        )}
        <details className="demo-explainer">
          <summary>
            {t(
              "Что здесь реализовано и зачем?",
              "What is implemented and why?",
              "რა არის განხორციელებული და რატომ?",
            )}
          </summary>
          <p>
            {kind === "interior"
              ? t(
                  "Фильтр помогает найти категорию. Карточка объясняет варианты материалов. Корзина сохраняет выбранные варианты и считает сумму внутри этой страницы.",
                  "Filters narrow the category. Product details explain material options. The cart retains variants and calculates the total within this page.",
                  "ფილტრი არჩევს კატეგორიას. ბარათი აჩვენებს მასალებს. კალათა ამ გვერდზე ინახავს ვარიანტებს და ითვლის ჯამს.",
                )
              : t(
                  "Посетитель знакомится с предложением и пробует выбор даты и времени. В рабочем сайте запись потребует проверки свободных мест и подтверждения сервером.",
                  "Visitors explore the offering and try selecting a date and time. A production booking needs availability checks and server confirmation.",
                  "ვიზიტორი ეცნობა შეთავაზებას და ირჩევს დროს. რეალურ საიტზე საჭიროა თავისუფალი ადგილების შემოწმება და სერვერის დადასტურება.",
                )}
          </p>
        </details>
      </section>
    </div>
  );
}
