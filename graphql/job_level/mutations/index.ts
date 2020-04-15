import {GraphQLNonNull} from "graphql";
import {Benefit, BenefitInput} from "../types";
import {createBenefit, updateBenefit} from "../resolvers/update";

const benefitMutations = {
    benefitUpdate: {
        args: {input: {type: GraphQLNonNull(BenefitInput)}},
        resolve: (source, args, context, info) => updateBenefit(source, args, context, info),
        type: new GraphQLNonNull(Benefit),
    },
    benefitCreate: {
        args: {input: {type: GraphQLNonNull(BenefitInput)}},
        resolve: (source, args, context, info) => createBenefit(source, args, context, info),
        type: new GraphQLNonNull(Benefit),
    },
};
export default benefitMutations;