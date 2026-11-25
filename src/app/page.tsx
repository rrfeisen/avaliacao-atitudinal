import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <GraduationCap className="h-7 w-7" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
        Sistema de Avaliação Atitudinal
      </h1>
      <p className="mt-3 text-base text-slate-600">
        Marco 1 — Modelo de Domínio, Camada Mock e Interface de Estudantes.
      </p>
      <Link
        href="/lab/students"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-indigo-700"
      >
        <span>Acessar listagem de estudantes</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </main>
  );
}
