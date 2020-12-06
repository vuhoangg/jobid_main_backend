import { GraphQLNonNull } from "graphql";
import { PaginationArguments } from "../../types";
import { getCvWarehouse, getCvWarehouses } from "../resolvers/get";
import { CvWarehouseArguments, CvWarehouseConnection, CvWarehouse } from "../types";

const cvWarehouseQueries = {
  cvWarehouse: {
    args: CvWarehouseArguments,
    resolve: (source, args, context, info) => getCvWarehouse(source, args, context, info),
    type: new GraphQLNonNull(CvWarehouse),
  },
  cvWarehouses: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getCvWarehouses(source, args, context, info),
    type: new GraphQLNonNull(CvWarehouseConnection),
  },
};

export default cvWarehouseQueries;
