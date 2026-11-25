"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2, Users } from "lucide-react";
import type { Student } from "@/types/domain";
import { listStudents } from "@/lib/data";
import { StudentCard } from "@/components/students/student-card";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStudents() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await listStudents();
        if (!cancelled) {
          setStudents(data);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : "Não foi possível carregar a lista de estudantes.";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadStudents();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeCount = students.filter((s) => s.status === "active").length;
  const inactiveCount = students.filter((s) => s.status === "inactive").length;
  const transferredCount = students.filter(
    (s) => s.status === "transferred",
  ).length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Sistema de Avaliação Atitudinal
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Estudantes
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Listagem de estudantes cadastrados para acompanhamento atitudinal.
          </p>
        </div>

        {!isLoading && !error && students.length > 0 && (
          <dl
            aria-label="Resumo de estudantes por status"
            className="flex flex-wrap gap-3 text-xs font-medium"
          >
            <div className="rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-200">
              <dt className="inline text-slate-500">Total: </dt>
              <dd className="inline font-semibold text-slate-900">
                {students.length}
              </dd>
            </div>
            <div className="rounded-lg bg-emerald-50 px-3 py-1.5 ring-1 ring-emerald-200">
              <dt className="inline text-emerald-700">Ativos: </dt>
              <dd className="inline font-semibold text-emerald-900">
                {activeCount}
              </dd>
            </div>
            <div className="rounded-lg bg-slate-100 px-3 py-1.5 ring-1 ring-slate-200">
              <dt className="inline text-slate-600">Inativos: </dt>
              <dd className="inline font-semibold text-slate-900">
                {inactiveCount}
              </dd>
            </div>
            <div className="rounded-lg bg-amber-50 px-3 py-1.5 ring-1 ring-amber-200">
              <dt className="inline text-amber-700">Transferidos: </dt>
              <dd className="inline font-semibold text-amber-900">
                {transferredCount}
              </dd>
            </div>
          </dl>
        )}
      </header>

      {isLoading && (
        <section
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center"
        >
          <Loader2
            className="h-8 w-8 animate-spin text-indigo-600"
            aria-hidden="true"
          />
          <p className="mt-3 text-sm font-medium text-slate-700">
            Carregando estudantes...
          </p>
        </section>
      )}

      {!isLoading && error !== null && (
        <section
          role="alert"
          className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center"
        >
          <AlertCircle className="h-8 w-8 text-red-600" aria-hidden="true" />
          <h2 className="mt-3 text-base font-semibold text-red-900">
            Erro ao carregar estudantes
          </h2>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </section>
      )}

      {!isLoading && error === null && students.length === 0 && (
        <section
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
        >
          <Users className="h-8 w-8 text-slate-400" aria-hidden="true" />
          <h2 className="mt-3 text-base font-semibold text-slate-900">
            Nenhum estudante cadastrado
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Não há estudantes disponíveis no momento.
          </p>
        </section>
      )}

      {!isLoading && error === null && students.length > 0 && (
        <section aria-label="Lista de estudantes">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <li key={student.id}>
                <StudentCard student={student} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
