import type { Student } from "@/types/domain";
import { MOCK_STUDENTS } from "@/lib/data/students";

const MOCK_LATENCY_MS = 700;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Retorna uma cópia da lista de estudantes com latência simulada (700 ms).
 * Nunca retorna referência direta ao array mock para impedir mutações acidentais.
 */
export async function listStudents(): Promise<Student[]> {
  await delay(MOCK_LATENCY_MS);
  return MOCK_STUDENTS.map((student) => ({ ...student }));
}

/**
 * Busca um estudante pelo seu UUID com latência simulada (700 ms).
 * Retorna uma cópia do estudante encontrado ou `null` caso não exista.
 */
export async function getStudent(id: string): Promise<Student | null> {
  await delay(MOCK_LATENCY_MS);
  const found = MOCK_STUDENTS.find((student) => student.id === id);
  return found ? { ...found } : null;
}
