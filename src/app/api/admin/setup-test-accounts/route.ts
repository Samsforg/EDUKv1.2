import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, run, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin-guard";

interface UserRow { id: number; }
interface ClassRow { id: number; }

const TEST_PASSWORD = process.env.TEST_ACCOUNT_PASSWORD ?? "ChangeMe!123";

async function POSTHandler() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Route désactivée en production" }, { status: 404 });
  }

  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const profEmail = 'prof.test@edukora.net';
  let prof = await queryOne<UserRow>('SELECT id FROM users WHERE email = ?', profEmail);
  if (!prof) {
    const hash = await hashPassword(TEST_PASSWORD);
    await run('INSERT INTO users (email, first_name, last_name, role, password_hash, blocked, created_at) VALUES (?, ?, ?, ?, ?, 0, now())',
      profEmail, 'Prof', 'Test', 'teacher', hash);
    prof = await queryOne<UserRow>('SELECT id FROM users WHERE email = ?', profEmail);
  }

  const teacherId = Number(prof!.id);
  let classe = await queryOne<ClassRow>('SELECT id FROM classes WHERE name = ? AND teacher_id = ?', '3ème A - Test', teacherId);
  if (!classe) {
    await run('INSERT INTO classes (name, teacher_id, subject, level, invite_code, created_at) VALUES (?, ?, ?, ?, ?, now())',
      '3ème A - Test', teacherId, 'Mathématiques', '3eme', 'TEST3A');
    classe = await queryOne<ClassRow>('SELECT id FROM classes WHERE name = ? AND teacher_id = ?', '3ème A - Test', teacherId);
  }

  const eleves = [
    { email: 'eleve1.test@edukora.net', prenom: 'Marie', nom: 'Kouassi' },
    { email: 'eleve2.test@edukora.net', prenom: 'Jean', nom: 'Traoré' },
    { email: 'eleve3.test@edukora.net', prenom: 'Fatou', nom: 'Diomandé' }
  ];
  
  for (const e of eleves) {
    let user = await queryOne<UserRow>('SELECT id FROM users WHERE email = ?', e.email);
    if (!user) {
      const hash = await hashPassword(TEST_PASSWORD);
      await run('INSERT INTO users (email, first_name, last_name, role, password_hash, blocked, created_at) VALUES (?, ?, ?, ?, ?, 0, now())',
        e.email, e.prenom, e.nom, 'student', hash);
      user = await queryOne<UserRow>('SELECT id FROM users WHERE email = ?', e.email);
    }
    await run('INSERT INTO class_students (class_id, student_id, joined_at) VALUES (?, ?, now())', classe!.id, user!.id);
  }

  return NextResponse.json({ 
    ok: true, 
    message: 'Comptes de test créés',
    accounts: {
      prof: { email: profEmail, password: '••••••••' },
      eleves: eleves.map(e => ({ email: e.email, password: '••••••••' })),
      codeClasse: 'TEST3A'
    }
  });
}

export const POST = guardApi("POST /api/admin/setup-test-accounts", POSTHandler);
