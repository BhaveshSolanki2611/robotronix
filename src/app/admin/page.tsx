"use client";

import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { Users, Calendar, Briefcase, Mail, Clock, ArrowLeft, RefreshCw } from "lucide-react";

interface Stats { contactCount: number; demoCount: number; careerCount: number; newsletterCount: number; }
interface Submission { id: string; name: string; email: string; company?: string; service?: string; message?: string; status: string; createdAt: string; }
interface Demo { id: string; name: string; email: string; company: string; demoType: string; date?: string; status: string; createdAt: string; }
interface Application { id: string; name: string; email: string; position: string; status: string; createdAt: string; }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [contacts, setContacts] = useState<Submission[]>([]);
  const [demos, setDemos] = useState<Demo[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"overview" | "contacts" | "demos" | "careers">("overview");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Unable to sign in.");
        return;
      }

      setAuthenticated(true);
      setPassword("");
      await fetchData();
    } catch {
      setLoginError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats", { credentials: "same-origin" });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setStats(data.stats);
      setContacts(data.recentContacts || []);
      setDemos(data.recentDemos || []);
      setApplications(data.recentApplications || []);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    setAuthenticated(false);
    setStats(null);
    setContacts([]);
    setDemos([]);
    setApplications([]);
  };

  const cardStyle = { backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" };
  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { new: "#00d4ff", pending: "#f59e0b", received: "#a78bfa", read: "#10b981", confirmed: "#10b981", completed: "#10b981", reviewing: "#f59e0b", shortlisted: "#10b981", replied: "#10b981", archived: "#6b7280", cancelled: "#ef4444", rejected: "#ef4444" };
    const c = colors[status] || "#6b7280";
    return <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${c}15`, color: c, border: `1px solid ${c}30` }}>{status}</span>;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="w-full max-w-sm rounded-2xl p-8" style={cardStyle}>
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold" style={{ fontFamily: "var(--font-display)" }}>RST</span>
            </div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Admin Access</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Enter admin password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ ...cardStyle, color: "var(--text-primary)" }} placeholder="Admin password" autoFocus />
            {loginError && <p className="text-sm text-red-400">{loginError}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-sm font-bold bg-accent text-black hover:opacity-90 transition-opacity disabled:opacity-60">{loading ? "Signing In..." : "Sign In"}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Admin Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Robotronix Submissions & Leads</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={cardStyle} disabled={loading}>
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={handleLogout} className="px-4 py-2 rounded-xl text-sm" style={cardStyle}>
              Sign Out
            </button>
            <MagneticButton variant="ghost" size="sm" href="/">
              <ArrowLeft size={14} /> Back to Site
            </MagneticButton>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: "Contact Inquiries", value: stats.contactCount, color: "#00d4ff" },
              { icon: Calendar, label: "Demo Requests", value: stats.demoCount, color: "#ff6b35" },
              { icon: Briefcase, label: "Job Applications", value: stats.careerCount, color: "#a78bfa" },
              { icon: Mail, label: "Newsletter Subs", value: stats.newsletterCount, color: "#10b981" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-6" style={cardStyle}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <s.icon size={18} style={{ color: s.color }} />
                  </div>
                </div>
                <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 rounded-xl p-1" style={cardStyle}>
          {(["overview", "contacts", "demos", "careers"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize" style={{ backgroundColor: tab === t ? "var(--accent-primary)" : "transparent", color: tab === t ? "#000" : "var(--text-secondary)" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Contacts */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}><Users size={16} className="text-accent" /> Recent Contacts</h3>
              {contacts.length === 0 ? <p className="text-sm" style={{ color: "var(--text-muted)" }}>No submissions yet</p> : (
                <div className="space-y-3">
                  {contacts.map((c) => (
                    <div key={c.id} className="rounded-xl p-3" style={{ backgroundColor: "var(--bg-secondary)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{c.name}</span>
                        {statusBadge(c.status)}
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{c.email}</p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}><Clock size={10} className="inline mr-1" />{formatDate(c.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Demos */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}><Calendar size={16} style={{ color: "#ff6b35" }} /> Recent Demos</h3>
              {demos.length === 0 ? <p className="text-sm" style={{ color: "var(--text-muted)" }}>No demo requests yet</p> : (
                <div className="space-y-3">
                  {demos.map((d) => (
                    <div key={d.id} className="rounded-xl p-3" style={{ backgroundColor: "var(--bg-secondary)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{d.name}</span>
                        {statusBadge(d.status)}
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{d.company} — {d.demoType}</p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}><Clock size={10} className="inline mr-1" />{formatDate(d.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Applications */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}><Briefcase size={16} style={{ color: "#a78bfa" }} /> Recent Applications</h3>
              {applications.length === 0 ? <p className="text-sm" style={{ color: "var(--text-muted)" }}>No applications yet</p> : (
                <div className="space-y-3">
                  {applications.map((a) => (
                    <div key={a.id} className="rounded-xl p-3" style={{ backgroundColor: "var(--bg-secondary)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{a.name}</span>
                        {statusBadge(a.status)}
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{a.position}</p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}><Clock size={10} className="inline mr-1" />{formatDate(a.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "contacts" && (
          <div className="rounded-2xl overflow-hidden" style={cardStyle}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Name</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Email</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Company</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Service</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Status</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Date</th>
                </tr></thead>
                <tbody>
                  {contacts.length === 0 ? <tr><td colSpan={6} className="p-8 text-center" style={{ color: "var(--text-muted)" }}>No submissions yet</td></tr> :
                  contacts.map((c) => (
                    <tr key={c.id} style={{ borderTop: "1px solid var(--border)" }}>
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>{c.email}</td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>{c.company || "—"}</td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>{c.service || "—"}</td>
                      <td className="p-4">{statusBadge(c.status)}</td>
                      <td className="p-4 text-xs" style={{ color: "var(--text-muted)" }}>{formatDate(c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "demos" && (
          <div className="rounded-2xl overflow-hidden" style={cardStyle}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Name</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Email</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Company</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Type</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Status</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Date</th>
                </tr></thead>
                <tbody>
                  {demos.length === 0 ? <tr><td colSpan={6} className="p-8 text-center" style={{ color: "var(--text-muted)" }}>No demo requests yet</td></tr> :
                  demos.map((d) => (
                    <tr key={d.id} style={{ borderTop: "1px solid var(--border)" }}>
                      <td className="p-4 font-medium">{d.name}</td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>{d.email}</td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>{d.company}</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent border border-accent/20">{d.demoType}</span></td>
                      <td className="p-4">{statusBadge(d.status)}</td>
                      <td className="p-4 text-xs" style={{ color: "var(--text-muted)" }}>{formatDate(d.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "careers" && (
          <div className="rounded-2xl overflow-hidden" style={cardStyle}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Name</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Email</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Position</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Status</th>
                  <th className="text-left p-4 font-medium" style={{ color: "var(--text-muted)" }}>Date</th>
                </tr></thead>
                <tbody>
                  {applications.length === 0 ? <tr><td colSpan={5} className="p-8 text-center" style={{ color: "var(--text-muted)" }}>No applications yet</td></tr> :
                  applications.map((a) => (
                    <tr key={a.id} style={{ borderTop: "1px solid var(--border)" }}>
                      <td className="p-4 font-medium">{a.name}</td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>{a.email}</td>
                      <td className="p-4" style={{ color: "var(--text-secondary)" }}>{a.position}</td>
                      <td className="p-4">{statusBadge(a.status)}</td>
                      <td className="p-4 text-xs" style={{ color: "var(--text-muted)" }}>{formatDate(a.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
