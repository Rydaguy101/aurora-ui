import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-6", className)}>
      <div className="absolute bottom-0 left-[11px] top-0 w-px bg-border" />
      {items.map((item) => (
        <div key={item.id} className="relative flex gap-4 pl-8">
          <div className="absolute left-0 top-1.5 size-[22px] rounded-full border-2 border-primary bg-background" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-medium">{item.title}</h4>
              {item.time && <span className="text-xs text-muted-foreground">{item.time}</span>}
            </div>
            {item.description && <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
