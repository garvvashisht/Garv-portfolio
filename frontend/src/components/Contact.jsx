import React, { useState } from "react";
import { personal } from "../mock";
import { Mail, Linkedin, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { submitContact } from "../api/client";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing details", description: "Please fill out every field before sending." });
      return;
    }
    setSending(true);
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      const firstName = form.name.split(" ")[0];
      setForm({ name: "", email: "", message: "" });
      toast({
        title: "Message sent",
        description: `Thanks ${firstName} — I will reply within 48 hours.`,
      });
    } catch (err) {
      const status = err?.response?.status;
      const detail = err?.response?.data?.detail;
      let title = "Could not send";
      let description = "Something went wrong, please try again in a moment.";
      if (status === 429) {
        title = "Slow down";
        description = "Too many messages from this device — try again in a minute.";
      } else if (status === 422) {
        title = "Check the details";
        description = "Please make sure the email looks right and the message is at least 5 characters.";
      } else if (typeof detail === "string") {
        description = detail;
      }
      toast({ title, description });
    } finally {
      setSending(false);
    }
  };

  const channels = [
    { icon: Mail, label: "email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: Linkedin, label: "linkedin", value: "garv-sharma6767", href: personal.linkedin },
    { icon: Phone, label: "phone", value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "based_in", value: personal.location, href: "#" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-[#0A0B0F] border-y border-white/8">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(34,211,238,0.6) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="container-lg relative">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 lg:col-span-5 reveal">
            <p className="eyebrow mb-4">
              <span className="text-[#6B7280]">{`// `}</span>06 — contact
            </p>
            <h2 className="font-serif text-[44px] md:text-[64px] leading-[1.02] tracking-tight font-light text-[#E5E7EB]">
              Let&apos;s build something <span className="italic" style={{
                background: "linear-gradient(90deg, #22D3EE 0%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>data-driven</span>.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-[#9CA3AF] max-w-md">
              Open to Data Analyst roles across the UK and remote, freelance BI engagements, and collaborations on analytics problems worth solving.
            </p>

            <div className="mt-10 space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 p-4 rounded-lg border border-white/10 bg-[#0D0F15] hover:border-[#22D3EE]/50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="w-10 h-10 rounded-md bg-[#12141B] border border-white/8 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4 text-[#22D3EE]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-widest uppercase text-[#6B7280]">
                        {c.label}
                      </span>
                      <span className="block text-[14px] text-[#E5E7EB] font-mono truncate">{c.value}</span>
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#4B5563] group-hover:text-[#22D3EE] transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 reveal">
            <form
              onSubmit={handleSubmit}
              className="bg-[#0D0F15] rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/8 bg-[#12141B]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-[#6B7280]">send_message.sh</span>
                <span className="font-mono text-[10px] text-[#34D399]">encrypted</span>
              </div>
              <div className="p-7 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="font-mono text-[10px] tracking-widest uppercase text-[#6B7280]">
                      <span className="text-[#22D3EE]">$</span> your_name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      maxLength={80}
                      required
                      className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-[#22D3EE] outline-none py-2 text-[16px] text-[#E5E7EB] placeholder:text-[#4B5563] font-mono transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-[10px] tracking-widest uppercase text-[#6B7280]">
                      <span className="text-[#22D3EE]">$</span> email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-[#22D3EE] outline-none py-2 text-[16px] text-[#E5E7EB] placeholder:text-[#4B5563] font-mono transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="font-mono text-[10px] tracking-widest uppercase text-[#6B7280]">
                    <span className="text-[#22D3EE]">$</span> what_are_you_working_on
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={5}
                    maxLength={2000}
                    className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-[#22D3EE] outline-none py-2 text-[16px] text-[#E5E7EB] placeholder:text-[#4B5563] resize-none transition-colors"
                    placeholder="Tell me about the dashboard, the pipeline or the decision you need..."
                  />
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-[11px] font-mono text-[#6B7280]">
                    <span className="text-[#34D399]">✔</span> typical reply time &lt; 48h
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#22D3EE] text-[#0A0B0F] text-[13px] font-mono font-semibold hover:bg-[#67E8F9] transition-colors disabled:opacity-60"
                  >
                    {sending ? "sending..." : "send_message()"}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
