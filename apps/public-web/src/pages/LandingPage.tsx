import { Button } from '@repo/ui';

import styles from './LandingPage.module.css';

export const LandingPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span aria-hidden="true">⬡</span>
          <span>Enterprise</span>
        </div>
        <nav className={styles.nav} aria-label="Main">
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#pricing" className={styles.navLink}>Pricing</a>
          <a href="http://localhost:3000" className={styles.navLink}>Admin</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Enterprise-grade monorepo</span>
            <h1 className={styles.heroTitle}>
              Build remarkable
              <br />
              <span className={styles.highlight}>software at scale</span>
            </h1>
            <p className={styles.heroSubtitle}>
              A production-ready enterprise architecture showcase built with React 18, TypeScript,
              Vite, Turborepo, and a shared design system.
            </p>
            <div className={styles.heroCta}>
              <Button size="lg" variant="primary">Get Started</Button>
              <Button size="lg" variant="secondary">View on GitHub</Button>
            </div>
          </div>
        </section>

        <section id="features" className={styles.features}>
          <h2 className={styles.sectionTitle}>Everything you need</h2>
          <div className={styles.featureGrid}>
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 Enterprise Monorepo. MIT License.</p>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className={styles.featureCard}>
    <span className={styles.featureIcon} aria-hidden="true">{icon}</span>
    <h3 className={styles.featureTitle}>{title}</h3>
    <p className={styles.featureDescription}>{description}</p>
  </div>
);

const FEATURES: FeatureCardProps[] = [
  { icon: '🏗️', title: 'Monorepo Architecture', description: 'Turborepo-powered monorepo with optimized pipelines, remote caching, and shared packages.' },
  { icon: '🎨', title: 'Design System', description: 'Battle-tested UI components with dark/light mode, design tokens, and Storybook docs.' },
  { icon: '🔒', title: 'Type-Safe', description: 'Strict TypeScript throughout, no any types, discriminated unions, and comprehensive type coverage.' },
  { icon: '⚡', title: 'Performance First', description: 'Code splitting, lazy routing, manual chunking, and Turborepo caching for fast builds.' },
  { icon: '🧪', title: 'Tested', description: 'Vitest for unit tests, Playwright for E2E. Every critical path covered.' },
  { icon: '🐳', title: 'Docker Ready', description: 'Multi-stage Dockerfile with Nginx for zero-downtime production deployments.' },
];
