"use client";

import { motion } from "framer-motion";

export function StatsSection() {
  const stats = [
    { value: "100K+", label: "NFTs Summoned" },
    { value: "50K+", label: "Successful Fusions" },
    { value: "10K+", label: "Legendary Items" },
    { value: "95%", label: "User Satisfaction" },
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-mysteria bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}