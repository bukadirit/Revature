/*istanbul ignore file*/
import { db } from "./db";
import { ManagerView, ManagerLine } from "../models/manager_view";

export async function getSort(option: string): Promise<ManagerView[]> {
  const sql = `SELECT * FROM project1.mview WHERE project1.mview.reimb_status = $1`;
  try {
    const result = await db.query<ManagerLine>(sql, [option]);
    return result.rows.map(ManagerView.from);
  } catch (error) {}
}
