import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Monitor,
  Users,
  Tag,
  CheckCircle2,
  ListChecks,
  GraduationCap,
  ArrowUpRight,
  Download,
  FileText,
  Video,
  Code2,
  Database,
  Presentation,
} from "lucide-react";
import { workshops, representatives } from "@/data/mockData";
import { useAuth } from "@/lib/auth";

const typeColors = {
  workshop: "bg-primary/10 text-primary",
  seminar: "bg-accent/10 text-accent",
  competition: "bg-warning/10 text-warning",
};

const audienceLabels = {
  representatives: "Department Representatives",
  students: "Students",
  public: "General Public",
};

const resourceIcon = (type) => {
  switch (type) {
    case "pdf":
      return FileText;
    case "slides":
      return Presentation;
    case "video":
      return Video;
    case "code":
      return Code2;
    case "dataset":
      return Database;
    default:
      return FileText;
  }
};

const SessionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleEnrollment } = useAuth();
  const workshop = workshops.find((w) => w.id === id);

  if (!workshop) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground mb-4">Session not found.</p>
        <Link to="/workshops" className="text-primary font-medium hover:underline">
          ← Back to all sessions
        </Link>
      </div>
    );
  }

  const isPast = workshop.status === "past";
  const fillPercent = Math.round((workshop.enrolled / workshop.maxParticipants) * 100);
  const enrolled = user?.enrolledWorkshopIds.includes(workshop.id) ?? false;
  const rep = workshop.instructorId ? representatives.find((r) => r.id === workshop.instructorId) : undefined;
  const sessionResources =
    workshop.resources ??
    (workshop.resourceUrl
      ? [{ id: `${workshop.id}-legacy`, title: "Session materials", type: "pdf", url: workshop.resourceUrl, size: "—" }]
      : []);
  const hasResources = sessionResources.length > 0;

  const handleRegister = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleEnrollment(workshop.id);
  };

  return (
    <div className="container py-12 max-w-6xl">
      <Link
        to="/workshops"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all sessions
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-card">
            <div className="h-1.5 w-full gradient-primary" />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${typeColors[workshop.type]}`}>
                  {workshop.type}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                  <Tag className="h-3 w-3" />
                  {workshop.topic}
                </span>
                <span
                  className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold ${
                    isPast ? "bg-muted text-muted-foreground" : "bg-success/10 text-success"
                  }`}
                >
                  {isPast ? "Completed" : "Upcoming"}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
                {workshop.title}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">{workshop.description}</p>

              {/* Meta grid */}
              <div className="grid sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/60">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase text-muted-foreground font-semibold">Date</div>
                    <div className="text-sm font-medium text-foreground">
                      {new Date(workshop.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase text-muted-foreground font-semibold">Time</div>
                    <div className="text-sm font-medium text-foreground">{workshop.time}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 shrink-0">
                    {workshop.location === "webinar" ? (
                      <Monitor className="h-4 w-4 text-accent" />
                    ) : (
                      <MapPin className="h-4 w-4 text-accent" />
                    )}
                  </div>
                  <div>
                    <div className="text-[11px] uppercase text-muted-foreground font-semibold">Location</div>
                    <div className="text-sm font-medium text-foreground">
                      {workshop.location === "webinar" ? "Online Webinar" : workshop.venue}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted shrink-0">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase text-muted-foreground font-semibold">Audience</div>
                    <div className="text-sm font-medium text-foreground">{audienceLabels[workshop.targetAudience]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agenda */}
          {workshop.agenda && workshop.agenda.length > 0 && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Agenda</h2>
              </div>
              <ul className="space-y-3">
                {workshop.agenda.map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-xs font-mono font-semibold text-primary bg-primary/10 rounded-md px-2 py-1 min-w-[60px] text-center">
                      {step.time}
                    </span>
                    <span className="text-sm text-foreground pt-1">{step.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites */}
          {workshop.prerequisites && workshop.prerequisites.length > 0 && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <h2 className="font-display text-lg font-semibold text-foreground">Prerequisites</h2>
              </div>
              <ul className="space-y-2">
                {workshop.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-success mt-1">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources from the representative */}
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-success" />
                <h2 className="font-display text-lg font-semibold text-foreground">Resources from the representative</h2>
              </div>
              {hasResources && (
                <Link
                  to={`/resources/${workshop.id}`}
                  className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
                >
                  View all
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Materials shared by {workshop.instructor} for this session.
            </p>

            {hasResources ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {sessionResources.map((r) => {
                  const Icon = resourceIcon(r.type);
                  return (
                    <div
                      key={r.id}
                      className="group rounded-xl border border-border/60 p-3 hover:border-primary/40 hover:bg-muted/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                              {r.type}
                            </span>
                            {r.size && <span className="text-[10px] text-muted-foreground">{r.size}</span>}
                          </div>
                          <div className="text-sm font-medium text-foreground leading-snug">{r.title}</div>
                          {r.description && (
                            <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">{r.description}</div>
                          )}
                        </div>
                      </div>
                      <a
                        href={r.url}
                        download
                        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-3 py-1.5 text-[11px] font-semibold transition-all"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/60 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isPast
                    ? "No materials have been uploaded for this session yet."
                    : "Resources will be uploaded by the representative after the session."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* CTA card */}
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card sticky top-24">
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground font-medium">Enrollment</span>
                <span className="font-semibold text-foreground">
                  {workshop.enrolled}/{workshop.maxParticipants}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${fillPercent}%` }} />
              </div>
            </div>

            {!isPast ? (
              <button
                onClick={handleRegister}
                className={`w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  enrolled
                    ? "bg-muted text-foreground hover:bg-muted/80"
                    : "gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
                }`}
              >
                {enrolled ? "Unregister" : "Register for this session"}
                {!enrolled && <ArrowUpRight className="h-4 w-4" />}
              </button>
            ) : hasResources ? (
              <Link
                to={`/resources/${workshop.id}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition-all"
              >
                <Download className="h-4 w-4" />
                Open resource library
              </Link>
            ) : (
              <div className="text-center text-xs text-muted-foreground py-2">This session has ended.</div>
            )}

            <div className="mt-4 pt-4 border-t border-border/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department</span>
                <span className="font-medium text-foreground">{workshop.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Topic</span>
                <span className="font-medium text-foreground">{workshop.topic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format</span>
                <span className="font-medium text-foreground capitalize">{workshop.location === "webinar" ? "Online" : "In-person"}</span>
              </div>
            </div>
          </div>

          {/* Instructor card */}
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-accent" />
              <h2 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">Led by</h2>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-primary-foreground font-display font-bold shrink-0">
                {workshop.instructor
                  .split(" ")
                  .filter((p) => !p.endsWith("."))
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <div className="font-display font-semibold text-foreground text-sm">{workshop.instructor}</div>
                {rep && <div className="text-xs text-muted-foreground mt-0.5">{rep.title}</div>}
                {rep && (
                  <Link
                    to="/representatives"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 mt-2"
                  >
                    View profile
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
            {rep?.bio && <p className="text-xs text-muted-foreground mt-4 leading-relaxed">{rep.bio}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsPage;
