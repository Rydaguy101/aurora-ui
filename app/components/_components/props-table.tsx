import type { ComponentControl, ComponentControlValue, ComponentEntry } from "@/lib/components/registry";

interface PropsTableProps {
  entry: ComponentEntry;
}

function controlTypeToPropType(type: ComponentControl["type"]) {
  switch (type) {
    case "toggle":
      return "boolean";
    case "slider":
      return "number";
    case "color":
      return "string";
    case "select":
      return "string";
    default:
      return "string";
  }
}

function formatDefault(value: ComponentControlValue | undefined) {
  if (value === undefined) return "—";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return String(value);
  return String(value);
}

export function PropsTable({ entry }: PropsTableProps) {
  const rows = (entry.controls ?? []).map((control) => ({
    property: control.key,
    type: controlTypeToPropType(control.type),
    defaultValue: formatDefault(entry.initialState?.[control.key]),
    description: control.label,
  }));

  if (rows.length === 0) {
    return (
      <section>
        <h2 className="mb-4 text-base font-medium text-foreground">Props</h2>
        <div className="rounded-lg border border-border/60 bg-[#111111] px-4 py-8 text-center text-sm text-muted-foreground">
          This component has no configurable props in the live demo.
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-base font-medium text-foreground">Props</h2>
      <div className="overflow-x-auto rounded-lg border border-border/60">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-[#111111] text-left text-muted-foreground">
              <th className="px-4 py-3 font-normal">Property</th>
              <th className="px-4 py-3 font-normal">Type</th>
              <th className="px-4 py-3 font-normal">Default</th>
              <th className="px-4 py-3 font-normal">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.property} className="border-b border-border/40 last:border-b-0">
                <td className="px-4 py-3 font-mono text-[13px] text-foreground">{row.property}</td>
                <td className="px-4 py-3 font-mono text-[13px] text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 font-mono text-[13px] text-muted-foreground">{row.defaultValue}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
