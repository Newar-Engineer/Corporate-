import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact Us — Newa Enterprises",
  description: "Get in touch with Newa Enterprises in Baneshwor, Kathmandu. Call, email, or visit us to discuss how we can support your business.",
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out to discuss your needs."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <SectionHeading title="Send Us a Message" />
              <ContactForm />
            </div>

            <div>
              <SectionHeading title="Contact Information" />
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <FiMapPin className="mt-1 shrink-0 text-amber-600" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Office Address</h4>
                    <p className="text-sm text-gray-600">
                      Baneshwor, Kathmandu<br />
                      Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiPhone className="mt-1 shrink-0 text-amber-600" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <a href="tel:+977-1-4XXXXXX" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                      +977-1-4XXXXXX
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMail className="mt-1 shrink-0 text-amber-600" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <a href="mailto:info@newaenterprises.com" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                      info@newaenterprises.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiClock className="mt-1 shrink-0 text-amber-600" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-sm text-gray-600">
                      Sunday – Friday: 9:00 AM – 6:00 PM<br />
                      Saturday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden border border-gray-200 h-72 sm:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0300186772647!2d85.3236!3d27.7026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190000000001%3A0x1b2b7b1b3b3b3b3b!2sBaneshwor%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Newa Enterprises — Baneshwor, Kathmandu"
            />
          </div>
        </div>
      </section>
    </>
  );
}
