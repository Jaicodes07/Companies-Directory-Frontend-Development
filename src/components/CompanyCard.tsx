import { Company } from '@/types/company';
import { ExternalLink, MapPin, Users, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="group h-full transition-all duration-200 hover:shadow-hover hover:scale-[1.02] will-change-transform">
      <CardContent className="p-6">
        {/* Logo and Name */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-16 h-16 rounded-lg object-cover shadow-sm"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
              {company.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{company.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {company.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{company.industry}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{company.size}</span>
          </div>
        </div>

        {/* Visit Website Link */}
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          aria-label={`Visit ${company.name} website`}
        >
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </a>
      </CardContent>
    </Card>
  );
};
