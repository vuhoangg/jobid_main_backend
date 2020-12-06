import { GraphQLNonNull } from "graphql";
import { createCvWarehouse, updateCvWarehouse } from "../resolvers/update";
import { CvWarehouse, CvWarehouseInput } from "../types";

const cvWarehouseMutations = {
  cvWarehouseUpdate: {
    args: { input: { type: GraphQLNonNull(CvWarehouseInput) } },
    resolve: (source, args, context, info) => updateCvWarehouse(source, args, context, info),
    type: new GraphQLNonNull(CvWarehouse),
  },
  cvWarehouseCreate: {
    args: { input: { type: GraphQLNonNull(CvWarehouseInput) } },
    resolve: (source, args, context, info) => createCvWarehouse(source, args, context, info),
    type: new GraphQLNonNull(CvWarehouse),
  },
};
export default cvWarehouseMutations;
