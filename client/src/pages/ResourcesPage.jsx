import { Link } from "react-router-dom";
import { Download, FileText, Calendar, BookOpen, ArrowUpRight } from "lucide-react";
import { workshops } from "@/data/mockData";

const ResourcesPage = () => {
  const pastWithResources = workshops.filter(
    (w) => w.status === "past" && ((w.resources && w.resources.length > 0) || w.resourceUrl),
  );

  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
          <BookOpen className="h-5 w-5 text-success" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">Resource Library</h1>
      </div>
      <p className="text-muted-foreground mb-8 ml-[52px]">
        Materials from past events are automatically available here once the session date has passed.
      </p>

      {pastWithResources.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card p-16 text-center shadow-card">
          <p className="text-muted-foreground">No resources available yet. Check back after upcoming events!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pastWithResources.map((w) => {
            const count = w.resources?.length ?? (w.resourceUrl ? 1 : 0);
            return (
              <Link
                key={w.id}
                to={`/resources/${w.id}`}
                className="group block rounded-2xl border border-border/60 bg-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div className="h-1 w-full gradient-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm leading-tight truncate">{w.title}</h3>
                      <span className="text-[11px] text-muted-foreground font-medium">{w.department}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{w.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(w.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-xl gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow group-hover:scale-105 transition-transform">
                      <Download className="h-3.5 w-3.5" />
                      {count} file{count === 1 ? "" : "s"}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
