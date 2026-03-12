import AnimateFeature from '@/components/features/landing/AnimateFeature';
import FeaturesLazy from '@/components/features/landing/FeatureLazy';
import Hero from '@/components/features/landing/Hero';

export default function Home() {
  return (
    <div className="bg-background-white dark:bg-background-black3">
      <Hero />
      <FeaturesLazy />
    </div>
  );
}
