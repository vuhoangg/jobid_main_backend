import JobCommentService from "../../../db/repositories/JobCommentRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateJobComment = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let input = args.input;
    return JobCommentService.update(input).then(async (data) => {
      return JobCommentService.update(input);
    });
  }
};

export const createJobComment = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let input = args.input;
    return JobCommentService.create(input).then((r) => r);
  }
};
