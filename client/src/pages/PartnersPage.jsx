import { partners } from "@/data/mockData";
import { Building2, GraduationCap, Landmark, Handshake } from "lucide-react";

const iconMap = {
  industry: Building2,
  rectorate: Landmark,
  academic: GraduationCap,
};

const typeColors = {
  industry: "bg-primary/10 text-primary",
  rectorate: "bg-accent/10 text-accent",
  academic: "bg-success/10 text-success",
};

const PartnersPage = () => {
  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
          <Handshake className="h-5 w-5 text-warning" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">Partnership Grid</h1>
      </div>
      <p className="text-muted-foreground mb-8 ml-[52px]">
        Collaborations with industry, rectorate, and academic institutions powering the AI House mission.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {partners.map((p) => {
          const Icon = iconMap[p.type] || Building2;
          const colorClass = typeColors[p.type] || "bg-muted text-muted-foreground";
          return (
            <div key={p.id} className="group rounded-2xl border border-border/60 bg-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
              <div className="h-1 w-full gradient-primary opacity-30 group-hover:opacity-100 transition-opacity" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClass} transition-transform group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{p.name}</h3>
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide">{p.type}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartnersPage;
