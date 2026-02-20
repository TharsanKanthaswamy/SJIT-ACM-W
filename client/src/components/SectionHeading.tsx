import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className = "", light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-20 text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${light ? "text-white" : "text-primary"}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg md:text-xl max-w-2xl mx-auto font-light ${light ? "text-white/80" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
        <div className={`h-1 w-20 mx-auto mt-6 rounded-full ${light ? "bg-white/30" : "bg-primary/20"}`} />
      </motion.div>
    </div>
  );
}
