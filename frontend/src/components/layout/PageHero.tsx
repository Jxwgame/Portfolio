import { Container } from "./Container";
import { OrbitBg } from "./OrbitBg";
import { Section } from "./Section";
import { DisplayHeading } from "@/components/common/DisplayHeading";
import { Eyebrow } from "@/components/common/Eyebrow";
import { cn } from "@/lib/utils";

/** หัวของหน้าย่อยทุกหน้า — ใช้ตัวเดียวกันหมดเพื่อให้เดินจากหน้าแรกมาแล้วรู้สึกต่อเนื่อง */
export function PageHero({
  eyebrow,
  title,
  description,
  supplement,
  backgroundImage,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  supplement?: React.ReactNode;
  /** รูปพื้นหลังเฉพาะหน้า — ถ้าไม่ใส่จะเป็นพื้นสีเข้มเรียบตาม theme เดิม */
  backgroundImage?: string;
  className?: string;
}) {
  return (
    <Section
      theme="dark"
      size="none"
      className={cn(
        // lg ขึ้นไปไม่มีแคปซูลลอยด้านบนแล้ว (แทนที่ด้วย sidebar ซ้าย) จึงลดระยะเว้นบนลง
        "pt-36 pb-16 md:pt-44 md:pb-20 lg:pt-24",
        // รูปพื้นหลังเป็นภาพแนวนอน (16:9) — ถ้าปล่อยให้สูงเท่าคอนเทนต์อย่างเดียวบนจอกว้าง object-cover จะครอปส่วนล่าง (ขาสะพาน/ราง) ทิ้งไปเกือบหมด จึงบังคับความสูงขั้นต่ำให้ภาพลงมาครอบพอดี
        backgroundImage && "min-h-[620px] md:min-h-[720px] lg:min-h-[840px]",
        className,
      )}
    >
      {backgroundImage && (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-20">
            <img src={backgroundImage} alt="" className="size-full object-cover" />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,18,32,0.85) 0%, rgba(10,18,32,0.55) 32%, rgba(10,18,32,0.15) 62%), linear-gradient(180deg, rgba(10,18,32,0.6) 0%, rgba(10,18,32,0.1) 22%, rgba(10,18,32,0) 40%)",
            }}
          />
        </>
      )}
      <OrbitBg className="-right-32 -top-32 w-[420px] opacity-15" />
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <DisplayHeading as="h1" className="mt-4 text-[clamp(2.6rem,7vw,5.5rem)]">
          {title}
        </DisplayHeading>
        {description && (
          <p className="mt-6 max-w-[60ch] leading-[1.75] text-muted">{description}</p>
        )}
        {supplement && <div className="mt-8">{supplement}</div>}
      </Container>
    </Section>
  );
}
