import { createCostAction } from "./create-costs";
import { deleteCostAction } from "./delete-cost";
import { updateCostAction } from "./update-cost";

export const cost = {
    create: createCostAction,
    delete: deleteCostAction,
    update: updateCostAction
}