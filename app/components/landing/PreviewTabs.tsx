"use client";

import { motion } from "framer-motion";
import {
  previewTabActive,
  previewTabActiveMarkov,
  previewTabInactive,
  previewTabList,
} from "./preview-styles";

type Tab = { id: string; label: string; highlight?: boolean };

type Props = {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel: string;
};

export function PreviewTabs({ tabs, activeId, onChange, ariaLabel }: Props) {
  return (
    <motion.div
      className={previewTabList}
      role="tablist"
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={
              isActive
                ? tab.highlight
                  ? previewTabActiveMarkov
                  : previewTabActive
                : previewTabInactive
            }
          >
            {tab.label}
            {tab.highlight && !isActive ? (
              <span className="ml-1 text-violet-300">★</span>
            ) : null}
          </button>
        );
      })}
    </motion.div>
  );
}
