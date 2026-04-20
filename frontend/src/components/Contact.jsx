import React, { useState } from "react";
import { personal } from "../mock";
import { Mail, Linkedin, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Missing details",
        description: "Please fill out every field before sending.",
      });
      return;
    }
    setSending(true);
    // Frontend-only mock: store in localStorage
    const submissions = JSON.parse(localStorage.getItem("gs_messages") || "[]");
    submissions.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem("gs_messages", JSON.stringify(submissions));
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast({
        title: "Message queued",
        description: `Thanks ${form.name.split(" ")[0]} — I will reply within 48 hours.`,
      });
    }, 700);
  };

  const channels = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "garv-sharma6767", href: personal.linkedin },
    { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Based in", value: personal.location, href: "#" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0C0D10] text-[#F5F1E8] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #F5F1E8 1px, transparent 1px), radial-gradient(circle at 80% 80%, #F5F1E8 1px, transparent 1px)",
          backgroundSize: "42px 42px, 42px 42px",
        }}
      />
      <div className="container-lg relative">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 lg:col-span-5 reveal">
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#F5F1E8]/60 mb-4">
              06 — Contact
            </p>
            <h2 className="font-serif text-[44px] md:text-[64px] leading-[1.02] tracking-tight font-light">
              Let&apos;s build something <span className="italic text-[#D9A066]">data-driven</span>.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-[#F5F1E8]/75 max-w-md">
              Open to Data Analyst roles across the UK and remote, freelance BI engagements, and collaborations on analytics problems worth solving.
            </p>

            <div className="mt-10 space-y-4">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-[#F5F1E8]/15 hover:border-[#D9A066]/60 hover:bg-[#F5F1E8]/5 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="w-10 h-10 rounded-lg bg-[#F5F1E8]/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4 text-[#D9A066]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-widest uppercase text-[#F5F1E8]/55">
                        {c.label}
                      </span>
                      <span className="block text-[15px] text-[#F5F1E8] truncate">{c.value}</span>
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#F5F1E8]/50 group-hover:text-[#D9A066] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 reveal">
            <form
              onSubmit={handleSubmit}
              className="bg-[#F5F1E8]/[0.04] backdrop-blur-sm rounded-2xl border border-[#F5F1E8]/15 p-7 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="font-mono text-[10px] tracking-widest uppercase text-[#F5F1E8]/60">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 w-full bg-transparent border-b border-[#F5F1E8]/20 focus:border-[#D9A066] outline-none py-2 text-[16px] text-[#F5F1E8] placeholder:text-[#F5F1E8]/30 transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-mono text-[10px] tracking-widest uppercase text-[#F5F1E8]/60">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full bg-transparent border-b border-[#F5F1E8]/20 focus:border-[#D9A066] outline-none py-2 text-[16px] text-[#F5F1E8] placeholder:text-[#F5F1E8]/30 transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="font-mono text-[10px] tracking-widest uppercase text-[#F5F1E8]/60">
                  What are you working on?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-2 w-full bg-transparent border-b border-[#F5F1E8]/20 focus:border-[#D9A066] outline-none py-2 text-[16px] text-[#F5F1E8] placeholder:text-[#F5F1E8]/30 resize-none transition-colors"
                  placeholder="Tell me about the dashboard, the pipeline or the decision you need..."
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-[12px] text-[#F5F1E8]/50">Typical reply time — within 48 hours.</p>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F5F1E8] text-[#0C0D10] text-[15px] font-medium hover:bg-[#D9A066] hover:text-[#0C0D10] transition-colors disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send message"}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
