import HeroBanner from "@/component/Banner";
import CallToAction from "@/component/CallToAction";
import JobFeatures from "@/component/JobFeatures";
import PricingSection from "@/component/PricingSection";
import SuccessFeatures from "@/component/SuccessFeatures";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroBanner></HeroBanner>
      <JobFeatures></JobFeatures>
      <SuccessFeatures></SuccessFeatures>
      <PricingSection></PricingSection>
      <CallToAction></CallToAction>
    </div>
  );
}
