import { useState, useMemo } from "react";
import { Search, Filter, Calendar } from "lucide-react";
import WorkshopCard from "@/components/WorkshopCard";
import { workshops, topics, departments } from "@/data/mockData";

const WorkshopsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [audienceFilter, setAudienceFilter] = useState("all");

  const filtered = useMemo(() => {
    return workshops.filter((w) => {
      if (search && !w.title.toLowerCase().includes(search.toLowerCase()) && !w.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== "all" && w.status !== statusFilter) return false;
      if (deptFilter !== "all" && w.department !== deptFilter) return false;
      if (topicFilter !== "all" && w.topic !== topicFilter) return false;
      if (audienceFilter !== "all" && w.targetAudience !== audienceFilter) return false;
      return true;
    });
  }, [search, statusFilter, deptFilter, topicFilter, audienceFilter]);

  const selectClass = "rounded-xl border border-border/60 bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors";

  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">Workshops & Activities</h1>
      </div>
      <p className="text-muted-foreground mb-8 ml-[52px]">Browse, filter, and register for AI training sessions across all departments.</p>

      {/* Filters */}
      <div className="rounded-2xl border border-border/60 bg-card p-4 mb-8 shadow-card">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search workshops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className={selectClass}>
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
          <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} className={selectClass}>
            <option value="all">All Topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select value={audienceFilter} onChange={(e) => setAudienceFilter(e.target.value)} className={selectClass}>
            <option value="all">All Audiences</option>
            <option value="representatives">Representatives</option>
            <option value="students">Students</option>
            <option value="public">General Public</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-medium">{filtered.length} activities found</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card p-16 text-center shadow-card">
          <p className="text-muted-foreground">No workshops match your filters. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((w) => (
            <WorkshopCard key={w.id} workshop={w} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkshopsPage;
