import * as sortDao from "../daos/sort-dao";
import { ManagerView } from "../models/manager_view";

export function sortTicket(option: string): Promise<ManagerView[]> {
  return sortDao.getSort(option);
}
