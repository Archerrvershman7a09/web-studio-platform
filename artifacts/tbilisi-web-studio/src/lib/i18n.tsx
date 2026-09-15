import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'ru' | 'ka' | 'en';

interface Translations {
  [key: string]: {
    ru: string;
    ka: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.works': { ru: 'Работы', ka: 'ნამუშევრები', en: 'Works' },
  'nav.create': { ru: 'Создать сайт', ka: 'საიტის შექმნა', en: 'Create website' },
  'nav.process': { ru: 'Процесс', ka: 'პროცესი', en: 'Process' },
  'nav.reviews': { ru: 'Отзывы', ka: 'მიმოხილვები', en: 'Reviews' },
  'nav.signin': { ru: 'Войти', ka: 'შესვლა', en: 'Sign in' },
  
  // Home Hero
  'hero.title': { 
    ru: 'Создаем цифровые пространства.', 
    ka: 'ვქმნით ციფრულ სივრცეებს.', 
    en: 'Crafting digital spaces.' 
  },
  'hero.subtitle': {
    ru: 'Студия веб-разработки в Тбилиси. Без шаблонов. Строгий дизайн и честный подход.',
    ka: 'ვებ-დეველოპმენტის სტუდია თბილისში. შაბლონების გარეშე.',
    en: 'Web development studio in Tbilisi. No templates. Rigorous design and honest approach.'
  },
  'hero.cta': { ru: 'Начать проект', ka: 'პროექტის დაწყება', en: 'Start a project' },
  'hero.secondary_cta': { ru: 'Выбрать формат', ka: 'ფორმატის შერჩევა', en: 'Choose format' },

  // General Status
  'status.demo': { ru: 'Демо', ka: 'დემო', en: 'Demo' },
  'status.concept': { ru: 'Концепт', ka: 'კონცეპტი', en: 'Concept' },
  'status.local': { ru: 'Сохранено локально', ka: 'შენახულია ლოკალურად', en: 'Saved locally' },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('app_lang') as Language;
    if (saved && ['ru', 'ka', 'en'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('app_lang', l);
  };

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][lang] || translations[key]['en'] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within a I18nProvider');
  }
  return context;
}
