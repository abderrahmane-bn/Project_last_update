import { useState, useMemo } from "react";
import { Search, Users } from "lucide-react";
import RepresentativeCard from "@/components/RepresentativeCard";
import { representatives, departments, topics } from "@/data/mockData";

const RepresentativesPage = () => {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [focusFilter, setFocusFilter] = useState("all");
  const [validFilter, setValidFilter] = useState("all");

  const filtered = useMemo(() => {
    return representatives.filter((r) => {
      if (search && !r.fullName.toLowerCase().includes(search.toLowerCase())) return false;
      if (deptFilter !== "all" && r.department !== deptFilter) return false;
      if (focusFilter !== "all" && r.aiFocus !== focusFilter) return false;
      if (validFilter === "validated" && !r.validated) return false;
      if (validFilter === "training" && r.validated) return false;
      return true;
    });
  }, [search, deptFilter, focusFilter, validFilter]);

  const selectClass = "rounded-xl border border-border/60 bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors";

  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
          <Users className="h-5 w-5 text-accent" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">AI Representative Network</h1>
      </div>
      <p className="text-muted-foreground mb-8 ml-[52px]">Faculty members leading the AI transition within their departments at the University of Blida 1.</p>

      <div className="rounded-2xl border border-border/60 bg-card p-4 mb-8 shadow-card">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors"
            />
          </div>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className={selectClass}>
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
          <select value={focusFilter} onChange={(e) => setFocusFilter(e.target.value)} className={selectClass}>
            <option value="all">All AI Focus</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select value={validFilter} onChange={(e) => setValidFilter(e.target.value)} className={selectClass}>
            <option value="all">All Status</option>
            <option value="validated">Validated</option>
            <option value="training">In Training</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-5 font-medium">{filtered.length} representatives found</p>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((r) => (
          <RepresentativeCard key={r.id} rep={r} />
        ))}
      </div>
    </div>
  );
};

export default RepresentativesPage;
