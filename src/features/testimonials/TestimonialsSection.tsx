"use client";

import { useEffect, useState } from "react";
import TestimonialCard from "@/features/testimonials/TestimonialCard";
import SectionHeading from "@/components/sections/SectionHeading";

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  message: string;
  rating: number;
  photoUrl?: string | null;
}

const placeholderTestimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    clientName: "Rabi Shakya",
    company: "ShopNepal Pvt. Ltd.",
    message:
      "Newa Tech delivered our mobile app in record time. The eSewa and Khalti payment integration was flawless. They truly understand both the technology and the Nepal market — a rare combination.",
    rating: 5,
  },
  {
    id: "placeholder-2",
    clientName: "Amit Pradhan",
    company: "FinFlow Technologies",
    message:
      "Our new web dashboard transformed how we run our business. What used to take half a day of manual work now loads in seconds. A great, reliable development partner.",
    rating: 5,
  },
  {
    id: "placeholder-3",
    clientName: "Dr. Sunita KC",
    company: "HealthFirst Nepal",
    message:
      "The healthcare booking platform has been a lifesaver for our patients and staff. Patient wait times dropped from 45 minutes to just 12 minutes.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [usingPlaceholder, setUsingPlaceholder] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("failed"))))
      .then((data) => {
        const list: Testimonial[] = Array.isArray(data) ? data : data.testimonials || [];
        if (list.length > 0) {
          setTestimonials(list.slice(0, 6));
        } else {
          setTestimonials(placeholderTestimonials);
          setUsingPlaceholder(true);
        }
      })
      .catch(() => {
        setTestimonials(placeholderTestimonials);
        setUsingPlaceholder(true);
      });
  }, []);

  return (
    <section
      data-scene-section
      data-scene-index={4}
      className="section-gradient-alt relative overflow-hidden py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_20%_40%,rgba(255,201,60,0.04),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Businesses across Nepal trust Newa Tech to design, build, and launch their websites and apps."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              clientName={t.clientName}
              company={t.company}
              message={t.message}
              rating={t.rating}
              photoUrl={t.photoUrl}
            />
          ))}
        </div>
        {usingPlaceholder && (
          <p className="mt-8 text-center text-xs text-slate-400 italic">
            Placeholder testimonials — real client stories coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
