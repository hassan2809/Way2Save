import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "What is halal meat?",
      answer: "Halal meat refers to meat prepared following Islamic dietary laws, ensuring it is clean, permissible, and humane.",
    },
    {
      question: "How do you ensure the meat is halal?",
      answer: "We source all our meat from trusted halal-certified suppliers and ensure the slaughter process adheres strictly to Islamic guidelines.",
    },
    {
      question: "Do you offer home delivery?",
      answer: "Yes, we provide convenient home delivery options. Simply place your order online, and we’ll deliver fresh meat to your doorstep.",
    },
    {
      question: "What types of meat do you sell?",
      answer: "We offer a variety of halal meats, including beef, chicken, lamb, goat, and seafood, all freshly prepared.",
    },
    {
      question: "Can I place bulk or custom orders?",
      answer: "Yes, we accept bulk and custom orders for special occasions. Contact us to discuss your requirements.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-16">
      <div className="max-w-3xl mx-auto">
      <h4 className="text-xl text-center text-yellow-500 font-jost">FAQ</h4>
        <h2 className="text-3xl font-bold text-center mb-2 font-jost">Have any questions in mind?</h2>
        <p className="text-gray-400 text-center mb-8 font-jost">
          We’re here to help! Find answers to some of the common questions about our halal meat shop.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='font-jost text-xl hover:no-underline'>{faq.question}</AccordionTrigger>
              <AccordionContent className='font-jost text-md text-gray-400'>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
