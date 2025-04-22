export class ModalManager {
  static openPointModal({ point }) {
    $('#pointModal').data('point', point);
    $('#pointRadius').val(point?.radius || '');
    $('#pointColor').val(point?.color || '#ff8000');
    $('#pointModal, #modalBackdrop').show();
  }

  static closePointModal() {
    $('#pointModal, #modalBackdrop').hide();
    $('#pointRadius').val('');
    $('#pointColor').val('#ff8000');
  }

  static openCommentModal({ pointId, comment = null } = {}) {
    $('#commentModal').data('pointId', pointId);
    $('#commentModal').data('commentId', comment?.id || null);
    $('#commentText').val(comment?.text || '');
    $('#commentColor').val(comment?.backgroundColor || '#ff8000');
    $('#commentModal, #modalBackdrop').show();
  }

  static closeCommentModal() {
    $('#commentModal, #modalBackdrop').hide();
    $('#commentText').val('');
    $('#commentColor').val('#ff8000');
    $('#commentModal').removeData('pointId').removeData('commentId');
  }
}