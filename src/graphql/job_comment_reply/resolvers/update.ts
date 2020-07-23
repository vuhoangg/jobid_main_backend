import JobCommentReplyService from "../../../db/repositories/JobCommentReplyRepository";

export function updateJobReplyComment(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    return JobCommentReplyService.update(input).then(async (data) => {
      return JobCommentReplyService.update(input);
    });
  }
}
export function createJobReplyComment(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    return JobCommentReplyService.create(input).then(r => r);
  }
}
