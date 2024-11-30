'use client'

import {useTheme} from '@/components/providers/theme-provider.tsx';
import {SiteHeader} from "@/sections/lading/components/site-header.tsx";
import HeroSection from "@/sections/lading/components/hero-section.tsx";
import {Particles} from "@/components/ui/particles.tsx";

export default function LandingPage() {
  const {theme} = useTheme();
  const quantity = 400;
  return (<>
    <SiteHeader/>
    <HeroSection/>
    <Particles
      className="absolute inset-0 -z-10"
      quantity={quantity}
      ease={70}
      size={0.1}
      staticity={30}
      color={theme === 'dark' ? '#ffffff' : '#000000'}
    />
  </>);
}
