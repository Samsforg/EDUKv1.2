import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { query } from "@/lib/db";

/**
 * Liste des classes teacher's utilisées par le sélecteur de planification.
 * Ne renvoie que les champs nécessaires à l'affichage du sélecteur :
 * ni jeton d'invitation, ni données d'élèves, ni email de l'enseignant.
 */
async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const classes = await query<{
    id: number;
    name: string;
    subject_id: number | null;
    grade_id: number | null;
    teacher_name: string;
  }>(
    `SELECT c.id, c.name, c.subject_id, c.grade_id,
            COALESCE(u.first_name || ' ' || u.last_name, u.email, 'Enseignant') AS teacher_name
     FROM classes c
     LEFT JOIN users u ON u.id = c.teacher_id
     ORDER BY c.name ASC`,
  );

  return NextResponse.json({ classes });
}

export const GET = guardApi("GET /api/admin/classes", GETHandler);
