import JobCommentService from "../../../db/repositories/JobCommentRepository";

export function updateJobComment(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    return JobCommentService.update(input).then(async (data) => {
      return JobCommentService.update(input);
    });
  }
}
export function createJobComment(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    return JobCommentService.create(input).then(r => r);
  }
}
