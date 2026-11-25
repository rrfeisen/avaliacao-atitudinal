"use client";

import { GraduationCap, Mail, Hash } from "lucide-react";
import type { Student, StudentStatus } from "@/types/domain";

export type StudentCardProps = {
  student: Student;
  onSelect?: (student: Student) => void;
};

const STATUS_LABELS: Record<StudentStatus, string> = {
  active: "Ativo",
  inactive: "Inativo",
  transferred: "Transferido",
};

const STATUS_STYLES: Record<StudentStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  inactive: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20",
  transferred: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
};

export function StudentCard({ student, onSelect }: StudentCardProps) {
  const statusLabel = STATUS_LABELS[student.status];
  const statusStyle = STATUS_STYLES[student.status];

  return (
    <article
      aria-label={`Estudante ${student.name}, matrícula ${student.registration}, status ${statusLabel}`}
      onClick={onSelect ? () => onSelect(student) : undefined}
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md ${
        onSelect ? "cursor-pointer" : ""
      }`}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            role="img"
            aria-label={`Ícone de estudante para ${student.name}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"
          >
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="truncate text-base font-semibold text-slate-900">
            {student.name}
          </h2>
        </div>

        <span
          aria-label={`Status do estudante: ${statusLabel}`}
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle}`}
        >
          {statusLabel}
        </span>
      </header>

      <dl className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <dt className="flex items-center gap-1.5 text-slate-500">
            <Hash className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span>Matrícula</span>
          </dt>
          <dd className="font-mono font-medium text-slate-800">
            {student.registration}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-2">
          <dt className="flex items-center gap-1.5 text-slate-500">
            <Mail className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span>E-mail</span>
          </dt>
          <dd className="truncate text-slate-700" title={student.email}>
            {student.email}
          </dd>
        </div>
      </dl>
    </article>
  );
}
