"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Loader2, Search, Users, X } from "lucide-react";
import type { Student } from "@/types/domain";
import { listStudents } from "@/lib/data";
import { StudentCard } from "@/components/students/student-card";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const normalizedQuery = normalizeText(searchQuery.trim());
  const filteredStudents = normalizedQuery
    ? students.filter((student) => {
        const nameMatch = normalizeText(student.name).includes(normalizedQuery);
        const registrationMatch = normalizeText(student.registration).includes(
          normalizedQuery,
        );
        const emailMatch = normalizeText(student.email).includes(
          normalizedQuery,
        );
        return nameMatch || registrationMatch || emailMatch;
      })
    : students;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Navegação de retorno" className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Voltar ao início</span>
        </Link>
      </nav>

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
        <>
          <div className="mb-6">
            <label htmlFor="student-search" className="sr-only">
              Pesquisar estudante por nome, matrícula ou e-mail
            </label>
            <div className="relative max-w-md">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="student-search"
                type="text"
                role="searchbox"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Pesquisar por nome, matrícula ou e-mail..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Limpar busca"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <section
              role="status"
              aria-live="polite"
              className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
            >
              <Search className="h-7 w-7 text-slate-400" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-slate-900">
                Nenhum estudante encontrado
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Não encontramos resultados para &ldquo;{searchQuery.trim()}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-lg bg-indigo-50 px-3.5 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
              >
                Limpar busca
              </button>
            </section>
          ) : (
            <section aria-label="Lista de estudantes">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map((student) => (
                  <li key={student.id}>
                    <StudentCard student={student} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  );
}
