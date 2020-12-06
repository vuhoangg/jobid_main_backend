import { GraphQLNonNull } from "graphql";
import { PaginationArguments } from "../../types";
import { getCvEmployer, getCvEmployers } from "../resolvers/get";
import { CvEmployerArguments, CvEmployerConnection, CvEmployer } from "../types";

const cvEmployerQueries = {
  cvEmployer: {
    args: CvEmployerArguments,
    resolve: (source, args, context, info) => getCvEmployer(source, args, context, info),
    type: new GraphQLNonNull(CvEmployer),
  },
  cvEmployers: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getCvEmployers(source, args, context, info),
    type: new GraphQLNonNull(CvEmployerConnection),
  },
};

export default cvEmployerQueries;
