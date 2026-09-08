import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import WhyUsSection from '../components/sections/WhyUsSection'
import CertificationsSection from '../components/sections/CertificationsSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ClientsSection from '../components/sections/ClientsSection'
import CTASection from '../components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <CertificationsSection />
      <ProjectsSection />
      <ClientsSection />
      <CTASection />
    </>
  )
}
