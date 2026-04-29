import { useAuth } from "@/lib/auth";
import { workshops } from "@/data/mockData";
import WorkshopCard from "@/components/WorkshopCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Calendar, GraduationCap, Plus, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

const RepresentativeDashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  // Match by instructor name OR by department fallback for newly-approved reps
  const mine = workshops.filter(
    (w) => w.instructor === user.fullName || (user.department && w.department === user.department),
  );
  const upcoming = mine.filter((w) => w.status === "upcoming");
  const past = mine.filter((w) => w.status === "past");
  const totalParticipants = mine.reduce((s, w) => s + w.enrolled, 0);

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-accent uppercase tracking-wider">Representative dashboard</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
              <BadgeCheck className="h-3.5 w-3.5" /> Approved
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Welcome, {user.fullName.split(" ")[0]}</h1>
          <p className="text-muted-foreground mt-1">
            {user.department} · {user.aiFocus}
          </p>
        </div>
        <Button asChild>
          <Link to="/workshops/new">
            <Plus className="h-4 w-4" />
            Create Workshop
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatTile icon={Calendar} label="Upcoming" value={upcoming.length} accent="bg-primary/10 text-primary" />
        <StatTile icon={GraduationCap} label="Past sessions" value={past.length} accent="bg-success/10 text-success" />
        <StatTile icon={Users} label="Participants" value={totalParticipants} accent="bg-accent/10 text-accent" />
        <StatTile icon={BadgeCheck} label="Total led" value={mine.length} accent="bg-warning/10 text-warning" />
      </div>

      <Section title="Your upcoming sessions" subtitle="Workshops, seminars and competitions you're leading">
        {upcoming.length === 0 ? (
          <EmptyState message="You have no upcoming sessions assigned." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {upcoming.map((w) => (
              <WorkshopCard key={w.id} workshop={w} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Your past sessions" subtitle="Sessions you previously delivered">
        {past.length === 0 ? (
          <EmptyState message="No past sessions yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {past.map((w) => (
              <WorkshopCard key={w.id} workshop={w} />
            ))}
          </div>
        )}
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
  children,
}) => (
  <section>
    <div className="mb-4">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const EmptyState = ({ message }) => (
  <Card className="p-10 text-center border-dashed">
    <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
    <p className="text-muted-foreground text-sm">{message}</p>
  </Card>
);

export default RepresentativeDashboard;
