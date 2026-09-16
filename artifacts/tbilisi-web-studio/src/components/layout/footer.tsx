import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { useStudioCopy } from "@/pages/home";
export function Footer() {
  const { t } = useI18n();
  const c = useStudioCopy();
  return (
    <footer className="border-t border-border">
      <div className="studio-section !py-10 flex flex-wrap justify-between gap-8">
        <div>
          <Link href="/" className="font-serif text-2xl">
            Tbilisi Web Studio
          </Link>
          <p className="text-sm text-muted-foreground mt-3">{c.footer}</p>
        </div>
        <nav className="flex gap-5 flex-wrap text-sm" aria-label="Footer">
          <Link href="/works">{t("nav.works")}</Link>
          <a href="/#process">{t("nav.process")}</a>
          <a href="/#reviews">{t("nav.reviews")}</a>
          <Link href="/create">{t("nav.create")}</Link>
        </nav>
      </div>
    </footer>
  );
}
