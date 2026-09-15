import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Header() {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif text-xl tracking-tight text-foreground hover:text-primary transition-colors">
            Tbilisi Web Studio
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/works" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.works')}
            </Link>
            <Link href="/#process" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.process')}
            </Link>
            <Link href="/#reviews" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.reviews')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 border border-transparent hover:border-border">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang('ru')} className={lang === 'ru' ? 'bg-muted' : ''}>
                Русский
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang('ka')} className={lang === 'ka' ? 'bg-muted' : ''}>
                ქართული
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang('en')} className={lang === 'en' ? 'bg-muted' : ''}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/sign-in" className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.signin')}
          </Link>
          <Link href="/create" className="inline-flex items-center justify-center rounded-none bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            {t('nav.create')}
          </Link>
        </div>
      </div>
    </header>
  );
}
