import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { Hero } from "@/components/sections/Hero";
import { WhatMeshimoIs } from "@/components/sections/WhatMeshimoIs";
import { CapabilityArchitecture } from "@/components/sections/CapabilityArchitecture";
import { ProcessInteractive } from "@/components/sections/ProcessInteractive";
import { TechnicalDepth } from "@/components/sections/TechnicalDepth";
import { SystemsMap } from "@/components/sections/SystemsMap";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Outcomes } from "@/components/sections/Outcomes";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <WhatMeshimoIs />
      <CapabilityArchitecture />
      <ProcessInteractive />
      <TechnicalDepth />
      <SystemsMap />
      <SelectedWork />
      <Outcomes />
      <FinalCta />
    </>
  );
}
