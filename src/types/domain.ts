/**
 * Fonte da verdade dos tipos de domínio do Sistema de Avaliação Atitudinal.
 *
 * Convenções adotadas:
 * - `type` como padrão para entidades e contratos do domínio.
 * - Enumerações modeladas como uniões de literais (sem `enum`).
 * - Timestamps representados como strings ISO 8601 em UTC com sufixo `Z`.
 * - Proibição estrita de `any`.
 */

/** String de data/hora no formato ISO 8601 em UTC com sufixo `Z`. */
export type IsoTimestamp = string;

/** Status cadastral do estudante na instituição. */
export type StudentStatus = "active" | "inactive" | "transferred";

/** Escala discreta de avaliação atitudinal (1 = Insuficiente a 5 = Exemplar). */
export type AttitudeScore = 1 | 2 | 3 | 4 | 5;

/** Turno de funcionamento de uma turma. */
export type ClassShift = "morning" | "afternoon" | "evening";

/** Situação do período avaliativo (bimestre/trimestre/semestre). */
export type PeriodStatus = "open" | "closed";

/** Contrato padrão de retorno para todas as Server Actions do sistema. */
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/** Turma escolar à qual os estudantes pertencem. */
export type ClassGroup = {
  id: string;
  name: string;
  code: string;
  academicYear: number;
  shift: ClassShift;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
};

/** Entidade central do domínio: estudante avaliado em suas atitudes. */
export type Student = {
  id: string;
  name: string;
  registration: string;
  email: string;
  classGroupId: string;
  status: StudentStatus;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
};

/** Professor responsável por registrar avaliações atitudinais. */
export type Teacher = {
  id: string;
  name: string;
  email: string;
  department: string;
  active: boolean;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
};

/** Período avaliativo que agrupa e consolida avaliações (ex.: 1º Bimestre). */
export type EvaluationPeriod = {
  id: string;
  name: string;
  academicYear: number;
  startDate: IsoTimestamp;
  endDate: IsoTimestamp;
  status: PeriodStatus;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
};

/** Dimensão atitudinal avaliada (ex.: Pontualidade, Participação, Respeito). */
export type AttitudeCategory = {
  id: string;
  name: string;
  description: string;
  weight: number;
  active: boolean;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
};

/** Registro de avaliação atitudinal ligando estudante, professor, categoria e período. */
export type AttitudeEvaluation = {
  id: string;
  studentId: string;
  teacherId: string;
  categoryId: string;
  periodId: string;
  score: AttitudeScore;
  observation: string | null;
  evaluatedAt: IsoTimestamp;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
};
