"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitContact, type ContactFormState } from "@/app/contact/actions";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

const fieldClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[14px] outline-none transition placeholder:text-muted focus:border-rust";
const labelClass = "font-mono text-[11px] uppercase tracking-[0.16em] text-muted";

type ContactFormCopy = {
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
};

export function ContactForm({ copy, locale = "en" }: { copy?: Partial<ContactFormCopy>; locale?: "en" | "th" }) {
  const [state, formAction] = useActionState(submitContact, initialState);

  const t: ContactFormCopy = {
    name: copy?.name ?? "Name",
    email: copy?.email ?? "Email",
    subject: copy?.subject ?? "Subject",
    message: copy?.message ?? "Message",
    send: copy?.send ?? "Send message",
    sending: copy?.sending ?? "Sending…",
  };

  return (
    <form action={formAction} className="grid gap-5">
      {/* honeypot — ซ่อนจากคนจริง ถ้ามีค่าแปลว่าเป็นบอท */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      {/* บอก server action ว่าจะตอบข้อความ success/error เป็นภาษาไหน */}
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>{t.name}</span>
          <input type="text" name="name" required maxLength={100} className={fieldClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>{t.email}</span>
          <input type="email" name="email" required maxLength={254} className={fieldClass} />
        </label>
      </div>

      <label className="grid gap-2">
        <span className={labelClass}>{t.subject}</span>
        <input type="text" name="subject" maxLength={150} className={fieldClass} />
      </label>

      <label className="grid gap-2">
        <span className={labelClass}>{t.message}</span>
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={5000}
          rows={5}
          className={cn(fieldClass, "resize-none")}
        />
      </label>

      {state.status !== "idle" && (
        <p
          role="status"
          className={cn(
            "font-mono text-[12px]",
            state.status === "success" ? "text-rust" : "text-red-500",
          )}
        >
          {state.message}
        </p>
      )}

      <SubmitButton sendLabel={t.send} sendingLabel={t.sending} />
    </form>
  );
}

function SubmitButton({ sendLabel, sendingLabel }: { sendLabel: string; sendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-fit items-center gap-2.5 rounded-full bg-rust px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-rust-deep disabled:opacity-60"
    >
      {pending ? sendingLabel : sendLabel}
    </button>
  );
}
