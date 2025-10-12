import AnimateFeature from '@/components/features/landing/AnimateFeature';
import Hero from '@/components/features/landing/Hero';
import ScrollButton from '@/components/ui/ScrollButton';

export default function Home() {
  return (
    <div className="bg-background-white dark:bg-background-black3">
      <Hero />
      <AnimateFeature />
      <ScrollButton />
    </div>
  );
}
