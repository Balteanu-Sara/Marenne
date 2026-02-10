"use client";

import { useState } from "react";

const faq = [
  {
    id: 0,
    question: "How do I place a trade order?",
    answer:
      "To set up a trade account with us please email mia@marennebooks.com. \nWe offer a 40% discount RRP across our entire catalogue & free shipping for orders over £40 in the UK.",
  },
  {
    id: 1,
    question: "Do you work on sale or return?",
    answer: "Yes we do, please see our trade terms.",
  },
  {
    id: 2,
    question: "Will I have to pay customs tax?",
    answer:
      "Yes, it is the retailer's responsibility to clear any custom or import charges which may occur. \nCustoms charges vary country to country. If you do not pay the necessary customs clearance, your order will be returned to the warehouse.",
  },
  {
    id: 3,
    question: "How long will it take for my order to arrive?",
    answer:
      "Orders from our UK warehouse are dispatched with next day delivery within the UK. \nFor ROW please allow 7-10 days. \nIf you need express shipping please let us know when placing your order.",
  },
  {
    id: 4,
    question: "What is Marenne Books and how does it work?",
    answer:
      "Marenne Books is a book distributor based in London with warehouses in the UK and EU. Marenne Books takes books, zines and magazines on a consignment basis and distributes them via independent bookstores and galleries worldwide. \nMarenne Books works on a commission split basis of your title(s) RRP of 20% to Marenne, 40% to the publisher and 40% to the retailer. \nFor more information please see our terms.",
  },
  {
    id: 5,
    question: "When will I receive payment?",
    answer:
      "You will receive your first sales report after 6 months. You will need to send an invoice with the amount shown with 30 day payment terms. Marenne Books cannot pay upfront for any titles that we take on.",
  },
  {
    id: 6,
    question: "Are you GPSR Compliant?",
    answer:
      "Yes, Marenne Books and all our publishers are EU and GPSR Compliant. \nPlease contact us for further information.",
  },
  {
    id: 7,
    question: "When will my tracking be available?",
    answer: "Tracking is updated as soon as your order is dispatched.",
  },
  {
    id: 8,
    question: "Will I have to pay custom charges?",
    answer:
      "Yes, you will receive an email notification from the local customs authority. \nIt is the customers responsibility to clear any custom and import charges. ",
  },
  {
    id: 9,
    question: "What if I have an issues with my order?",
    answer: "For any queries please email shop@marennebooks.com",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  function toggle(id: number) {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="flex flex-col px-5 justify-center gap-13 w-100% min-h-[410px] mt-6 font-garamond text-2xl">
      <div>
        <p className="italic">Retailer & Trade Orders</p>
        {faq.slice(0, 4).map((q) => {
          return (
            <div
              className={`flex flex-col py-4 border-b-black border-b-[1px] cursor-pointer overflow-hidden transition-all duration-1000 ${open[q.id] ? "max-h-100 lg:max-h-55" : "max-h-25 lg:max-h-17"}`}
              onClick={() => toggle(q.id)}
              key={q.id}
            >
              <div className="flex flex-row justify-between items-center">
                <p>{q.question}</p>
                <p>{open[q.id] ? "-" : "+"}</p>
              </div>
              {open[q.id] && <p className="mt-3 text-lg">{q.answer}</p>}
            </div>
          );
        })}
      </div>

      <div>
        <p className="italic">Publishers</p>
        {faq.slice(4, 7).map((q) => {
          return (
            <div
              className={`flex flex-col py-4 border-b-black border-b-[1px] cursor-pointer overflow-hidden transition-all duration-1000 ${open[q.id] ? "max-h-100 lg:max-h-55" : "max-h-25 lg:max-h-17"}`}
              onClick={() => toggle(q.id)}
              key={q.id}
            >
              <div className="flex flex-row justify-between items-center">
                <p>{q.question}</p>
                <p>{open[q.id] ? "-" : "+"}</p>
              </div>
              {open[q.id] && <p className="mt-3 text-lg">{q.answer}</p>}
            </div>
          );
        })}
      </div>

      <div>
        <p className="italic">Online Orders</p>
        {faq.slice(7).map((q) => {
          return (
            <div
              className={`flex flex-col py-4 border-b-black border-b-[1px] cursor-pointer overflow-hidden transition-all duration-1000 ${open[q.id] ? "max-h-100 lg:max-h-55" : "max-h-25 lg:max-h-17"}`}
              onClick={() => toggle(q.id)}
              key={q.id}
            >
              <div className="flex flex-row justify-between items-center">
                <p>{q.question}</p>
                <p>{open[q.id] ? "-" : "+"}</p>
              </div>
              {open[q.id] && <p className="mt-3 text-lg">{q.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
