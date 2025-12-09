import React from "react";

interface InfoItemProps {
  label: string;
  value: string | number | null | undefined;
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0">
    <span className="text-gray-400 text-sm font-medium">{label}</span>
    <span className="text-white text-sm font-semibold">{value ?? "—"}</span>
  </div>
);
