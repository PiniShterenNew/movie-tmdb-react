import React from "react";
import { Film } from "lucide-react";
import type { ProductionCompany } from "@/shared/types";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

interface MovieProductionCompaniesProps {
    companies: ProductionCompany[];
}

/**
 * MovieProductionCompanies Component
 * Single Responsibility: Display production companies section
 */
export const MovieProductionCompanies: React.FC<MovieProductionCompaniesProps> = ({ companies }) => {
    if (companies.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#1a1a1c] rounded-[14px] p-5 border border-white/10">
            <h3 className="text-[#f2f2f2] font-bold text-lg mb-4 pb-2 border-b border-white/10">חברות הפקה</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {companies.map((company) => (
                    <div 
                        key={company.id} 
                        className="flex items-center gap-3 bg-[#0e0e0f] rounded-lg p-3 border border-white/10 hover:border-[#ff2d55]/30 transition-modern"
                    >
                        {company.logo_path ? (
                            <ResponsiveImage
                                src={company.logo_path}
                                alt={company.name}
                                className="w-12 h-12 object-contain"
                                sizes="48px"
                                fallbackSize="w200"
                            />
                        ) : (
                            <div className="w-12 h-12 bg-[#1a1a1c] rounded flex items-center justify-center">
                                <Film className="w-6 h-6 text-[#f2f2f2]/40" />
                            </div>
                        )}
                        <span className="text-[#f2f2f2] text-sm font-medium flex-1 line-clamp-2">{company.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
