"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export const FadeIn = ({ children }: PropsWithChildren) => (
  <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
    {children}
  </motion.div>
);
