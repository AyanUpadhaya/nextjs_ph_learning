import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-500">
          Here’s what’s happening with your account today
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value="12" subtitle="+2 this month" />
        <StatCard title="Active Tasks" value="34" subtitle="5 due today" />
        <StatCard title="Messages" value="8" subtitle="3 unread" />
        <StatCard title="Account Status" value="Active" highlight />
      </div>

      {/* SECOND SECTION */}
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard
          title="Recent Activity"
          items={[
            "Logged in from new device",
            "Updated profile details",
            "Created a new project",
            "Completed a task",
          ]}
        />

        <InfoCard
          title="Quick Notes"
          items={[
            "Finish dashboard UI",
            "Add role-based access",
            "Integrate notifications",
          ]}
        />
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, subtitle, highlight }) {
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm transition hover:shadow-md ${
        highlight ? "bg-black text-white" : "bg-white"
      }`}
    >
      <p className="text-sm opacity-70">{title}</p>
      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
      {subtitle && (
        <p className="mt-1 text-xs opacity-70">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function InfoCard({ title, items }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-black" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
