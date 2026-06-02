import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  period = "/mo",
  description,
  features,
  highlighted = false,
  ctaLabel = "Get started",
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border bg-card/60 p-6 shadow-lg backdrop-blur",
        highlighted ? "border-primary shadow-primary/20" : "border-border",
        className
      )}
    >
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        <div className="mt-4 flex items-end gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="pb-1 text-sm text-muted-foreground">{period}</span>
        </div>
      </div>
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className="mt-8 w-full" variant={highlighted ? "default" : "outline"}>
        {ctaLabel}
      </Button>
    </div>
  );
}
