import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-background py-12 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-lg mb-4">Tbilisi Web Studio</h3>
          <p className="text-sm text-muted-foreground">
            Independent web design and development.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Studio</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/works" className="hover:text-primary">Works</Link></li>
            <li><Link href="/#process" className="hover:text-primary">Process</Link></li>
            <li><Link href="/estimate" className="hover:text-primary">Estimate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Concepts</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/demo/cafe" className="hover:text-primary">Cafe</Link></li>
            <li><Link href="/demo/beauty" className="hover:text-primary">Beauty Salon</Link></li>
            <li><Link href="/demo/interior" className="hover:text-primary">Interior Decor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/readiness" className="hover:text-primary">Platform Status</Link></li>
            <li><Link href="/workspace" className="hover:text-primary">Workspace Preview</Link></li>
            <li><Link href="/admin" className="hover:text-primary">Admin (Locked)</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Tbilisi Web Studio. All interactions are concept demos.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/readiness" className="hover:text-foreground">Readiness Checklist</Link>
        </div>
      </div>
    </footer>
  );
}
