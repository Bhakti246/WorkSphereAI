"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { label: "Live employees", value: "4.2k+" },
  { label: "AI automation", value: "98%" },
  { label: "Payroll accuracy", value: "99.9%" },
];

const features = [
  {
    title: "AI Attendance",
    description:
      "Face recognition, auto check-in, and live attendance tracking for modern teams.",
    points: ["Face recognition", "Auto punch flow", "Live presence maps"],
  },
  {
    title: "AI Payroll",
    description:
      "Automated salary calculations with half-day and leave-aware adjustments.",
    points: ["Smart salary logic", "Half-day detection", "Leave-aware payouts"],
  },
  {
    title: "AI Leave Management",
    description:
      "Instant requests, approvals, and AI-generated leave insights in one motion.",
    points: ["Approval workflow", "Leave balance AI", "Forecasting"],
  },
  {
    title: "Employee Analytics",
    description:
      "Productivity, attendance trend, and department intelligence in real time.",
    points: ["Productivity score", "Trend insights", "Department coaching"],
  },
  {
    title: "AI Assistant",
    description:
      "Ask natural language questions and get executive summaries instantly.",
    points: ["Who was absent today?", "Show late employees", "Generate salary report"],
  },
  {
    title: "Executive Control",
    description:
      "A premium operating surface for owners, employees, and finance teams.",
    points: ["Owner dashboard", "Employee portal", "Notify in seconds"],
  },
];

const modules = [
  {
    title: "Owner dashboard",
    copy:
      "Track live headcount, payroll health, attendance, and AI recommendations from a single control center.",
  },
  {
    title: "Employee dashboard",
    copy:
      "Give every employee a personal command center for attendance history, salary details, leave balance, and performance reports.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.24),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#030712_50%,_#01040d_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-lg font-semibold text-cyan-300">
            W
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase">
              WorkSphere AI
            </p>
            <p className="text-xs text-slate-400">AI workforce OS</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#modules" className="transition hover:text-white">
            Modules
          </a>
          <a href="#architecture" className="transition hover:text-white">
            Architecture
          </a>
        </nav>

        <Link
          href="/dashboard"
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
        >
          Open dashboard
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-20 px-6 pb-24 pt-4 lg:px-8">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Premium SaaS for modern teams
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
              Your AI Workforce Operating System
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400 sm:text-xl">
              Manage attendance, salaries, leaves, performance, and employee operations with AI automation designed for premium startups.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_50px_rgba(34,211,238,0.25)] transition hover:scale-[1.02]"
              >
                Launch experience
              </Link>
              <a
                href="#features"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:bg-white/10"
              >
                Explore modules
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="relative"
          >
            <div className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/70 p-4 shadow-[0_0_90px_rgba(34,211,238,0.16)] backdrop-blur-2xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-white">AI Assistant live</p>
                    <p className="text-sm text-slate-400">Operations / People / Finance</p>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-300">
                    Online
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_0.9fr]">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-cyan-200">Attendance pulse</p>
                      <p className="text-sm text-cyan-100">83%</p>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800">
                      <div className="h-2 w-[83%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <div className="flex items-center justify-between"> <span>Present</span><span>311</span></div>
                      <div className="flex items-center justify-between"> <span>Late</span><span>24</span></div>
                      <div className="flex items-center justify-between"> <span>Absent</span><span>11</span></div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">AI prompt</p>
                    <div className="mt-3 rounded-xl border border-cyan-400/20 bg-slate-900/80 p-3 text-sm text-slate-300">
                      “Who was absent today?”
                    </div>
                    <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-300">
                      “Show late employees.”
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 shadow-[0_0_80px_rgba(2,132,199,0.08)] backdrop-blur-2xl">
          <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Product features</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Built to feel like the next AI-native operating layer</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Every module is designed for beautiful automation, real-time intelligence, and the premium clarity that modern founders expect.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="modules" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {modules.map((module) => (
            <div key={module.title} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 backdrop-blur-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">{module.title}</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">{module.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{module.copy}</p>
              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-slate-200">
                AI-driven insights, notifications, and rich analytics keep every workflow fast and calm.
              </div>
            </div>
          ))}
        </section>

        <section id="architecture" className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 backdrop-blur-2xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Architecture</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">A complete modern stack for AI workforce operations</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-400">
                <li>• Frontend: Next.js, React, TypeScript, TailwindCSS, Framer Motion</li>
                <li>• Backend: Django, Django REST Framework</li>
                <li>• Database: PostgreSQL</li>
                <li>• AI: Claude API with OpenCV and face recognition services</li>
                <li>• Modules: attendance, payroll, leave, notifications, department, employee, and AI assistant</li>
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">Reference blueprint</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">Employee → Attendance → Payroll → Notifications</div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">Leave requests → Approvals → Insights → Reporting</div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">AI assistant → Claude API → dashboards and summaries</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}