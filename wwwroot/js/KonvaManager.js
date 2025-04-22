import { ApiManager } from './ApiManager.js';
import { ModalManager } from './ModalManager.js';

export class KonvaManager {
  constructor(containerId = 'container') {
    this.containerId = containerId;
    this.apiManager = new ApiManager();
    this.stage = null;
    this.layer = null;
  }

  setupStage() {
    const container = document.getElementById('container');
    this.stage = new Konva.Stage({
      container: this.containerId,
      width: container.clientWidth,
      height: container.clientHeight
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  renderPoints(points) {
    this.layer.destroyChildren();

    points.forEach(point => {
      const group = this.createPointGroup(point);
      this.layer.add(group);
    });

    this.layer.draw();
  }

  createPointGroup(point) {
    const group = new Konva.Group({
      x: point.x,
      y: point.y,
      draggable: true
    });

    const circle = this.createPointCircle(point);
    group.add(circle);

    let currentY = point.radius + 10;

    (point.comments || []).forEach(comment => {
      const commentGroup = this.createCommentGroup(comment, currentY);
      group.add(commentGroup);
      currentY += commentGroup.getChildren()[0].height() + 5;
    });

    const plusGroup = this.createPlusGroup(currentY, point.id);
    group.add(plusGroup);

    group.on("dragend", (e) => {
      const newPos = e.target.position();
      this.apiManager.dragPoint(point, newPos);
    });
    return group;
  }

  createPointCircle(point) {
    const circle = new Konva.Circle({
      x: 0,
      y: 0,
      radius: point.radius,
      fill: point.color
    });


    let lastClickTime = 0;
    let clickTimeout = null;
    let isDragging = false;
    let pointerDownPos = null;

    circle.on("pointerdown", (e) => {
      pointerDownPos = e.evt ? { x: e.evt.clientX, y: e.evt.clientY } : null;
    });

    circle.on("pointerup", (e) => {
      if (isDragging) {
        isDragging = false;
        return;
      }

      const pointerUpPos = e.evt ? { x: e.evt.clientX, y: e.evt.clientY } : null;

      const moved = Math.abs(pointerUpPos.x - pointerDownPos.x) > 5 || Math.abs(pointerUpPos.y - pointerDownPos.y) > 5;
      if (moved) return;

      const currentTime = new Date().getTime();

      if (currentTime - lastClickTime < 250) {
        clearTimeout(clickTimeout);
        lastClickTime = 0;

        this.apiManager.deletePoint(point);
      } else {
        lastClickTime = currentTime;

        clickTimeout = setTimeout(() => {
          ModalManager.openPointModal({ point });
          lastClickTime = 0;
        }, 250);
      }
    });

    return circle;
  }

  createCommentGroup(comment, yPos) {
    const text = new Konva.Text({
      text: comment.text,
      fontSize: 14,
      padding: 5,
      fill: "#000"
    });

    const background = new Konva.Rect({
      width: text.width() + 10,
      height: text.height() + 10,
      fill: comment.backgroundColor,
      cornerRadius: 5
    });

    const group = new Konva.Group({
      x: 0,
      y: yPos,
      offsetX: background.width() / 2
    });

    group.add(background);
    group.add(text);
    group.on("click", () => ModalManager.openCommentModal({ comment: comment }));

    return group;
  }

  createPlusGroup(yPos, pointId) {
    const circleRadius = 15;

    const background = new Konva.Circle({
      radius: circleRadius,
      fill: '#FFFFFF',
      stroke: 'black',
      strokeWidth: 2
    });

    const text = new Konva.Text({
      text: "+",
      fontSize: 20,
      fill: "#59d43c",
      align: "center",
      verticalAlign: "middle",
      width: circleRadius * 2,
      height: circleRadius * 2,
      offsetX: circleRadius,
      offsetY: circleRadius
    });

    const group = new Konva.Group({
      x: 0,
      y: yPos + circleRadius
    });

    group.add(background);
    group.add(text);
    group.on("click", () => ModalManager.openCommentModal({ pointId: pointId }));

    return group;
  }
}