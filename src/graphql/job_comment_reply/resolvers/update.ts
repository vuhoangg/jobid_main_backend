import JobCommentReplyService from "../../../db/repositories/JobCommentReplyRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobReplyComment = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let input = args.input;
    return JobCommentReplyService.update(input).then(async (data) => {
      return JobCommentReplyService.update(input);
    });
  }
};
export const createJobReplyComment = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let input = args.input;
    return JobCommentReplyService.create(input).then((r) => r);
  }
};
