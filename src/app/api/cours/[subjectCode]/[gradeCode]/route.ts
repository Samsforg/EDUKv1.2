import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ subjectCode: string; gradeCode: string }> }
) {
  const { subjectCode, gradeCode } = await params;
  
  const chapters = await query<{ 
    id: number; 
    code: string; 
    title: string; 
    description: string; 
    order_index: number;
    subject_code: string;
    grade_code: string;
  }>(
    `SELECT c.id, c.code, c.title, c.description, c.order_index,
            s.code as subject_code, g.code as grade_code
     FROM chapters c
     JOIN subjects s ON s.id = c.subject_id
     JOIN grades g ON g.id = c.grade_id
     WHERE s.code = ? AND g.code = ?
     ORDER BY c.order_index`,
    subjectCode, gradeCode
  );
  
  return NextResponse.json({ chapters });
}