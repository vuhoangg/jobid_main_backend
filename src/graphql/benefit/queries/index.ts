import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getBenefit, getBenefits} from "../resolvers/get";
import {Benefit, BenefitArguments, BenefitConnection} from "../types";

const benefitQueries = {
    benefit: {
        args: BenefitArguments,
        resolve: (source, args, context, info) => getBenefit(source, args, context, info),
        type: new GraphQLNonNull(Benefit),
    },
    benefits: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getBenefits(source, args, context, info),
        type: new GraphQLNonNull(BenefitConnection),
    }
};
export default benefitQueries;