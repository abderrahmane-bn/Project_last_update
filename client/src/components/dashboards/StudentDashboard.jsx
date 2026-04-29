import { useAuth } from "@/lib/auth";
import { workshops, representatives } from "@/data/mockData";
import WorkshopCard from "@/components/WorkshopCard";
import RepresentativeCard from "@/components/RepresentativeCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, CheckCircle2, Clock, Sparkles } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  const enrolled = workshops.filter((w) => user.enrolledWorkshopIds.includes(w.id));
  const upcoming = enrolled.filter((w) => w.status === "upcoming");
  const past = enrolled.filter((w) => w.status === "past");
  const featuredReps = representatives.filter((r) => r.validated).slice(0, 3);
  const isPendingRep = user.repStatus === "pending";

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Student dashboard</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Hello, {user.fullName.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground mt-1">Track your trainings and discover new sessions.</p>
        </div>
        <Button asChild>
          <Link to="/workshops">Browse workshops</Link>
        </Button>
      </header>

      {isPendingRep && (
        <Card className="p-5 border-warning/40 bg-warning/5 flex items-start gap-3">
          <Clock className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Representative application pending</p>
            <p className="text-sm text-muted-foreground mt-1">
              An admin is reviewing your application. You can keep using the platform as a student in the meantime.
            </p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatTile icon={Calendar} label="Upcoming" value={upcoming.length} accent="bg-primary/10 text-primary" />
        <StatTile icon={CheckCircle2} label="Completed" value={past.length} accent="bg-success/10 text-success" />
        <StatTile icon={BookOpen} label="Total enrollments" value={enrolled.length} accent="bg-accent/10 text-accent" />
      </div>

      <Section title="Your upcoming workshops" subtitle="Sessions you're registered for">
        {upcoming.length === 0 ? (
          <EmptyState message="You haven't registered for any upcoming sessions yet." cta />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {upcoming.map((w) => (
              <WorkshopCard key={w.id} workshop={w} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Past sessions" subtitle="Sessions you attended">
        {past.length === 0 ? (
          <EmptyState message="No completed sessions yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {past.map((w) => (
              <WorkshopCard key={w.id} workshop={w} />
            ))}
          </div>
        )}
      </Section>

      <Section
        title="Meet your representatives"
        subtitle="Faculty members leading the AI transition"
        action={
          <Button asChild variant="ghost" size="sm">
            <Link to="/representatives">View all</Link>
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredReps.map((r) => (
            <RepresentativeCard key={r.id} rep={r} />
          ))}
        </div>
      </Section>
    </div>
  );
};

const StatTile = ({
  icon: Icon,
  label,
  value,
  accent,
}) => (
  <Card className="p-5">
    <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${accent} mb-3`}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="font-display text-3xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground mt-1 font-medium">{label}</div>
  </Card>
);

const Section = ({
  title,
  subtitle,
  action,
  children,
}) => (
  <section>
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </section>
);

const EmptyState = ({ message, cta }) => (
  <Card className="p-10 text-center border-dashed">
    <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
    <p className="text-muted-foreground text-sm">{message}</p>
    {cta && (
      <Button asChild className="mt-4" size="sm">
        <Link to="/workshops">Find a workshop</Link>
      </Button>
    )}
  </Card>
);

export default StudentDashboard;
