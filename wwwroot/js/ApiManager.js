/* eslint-disable no-undef */
import { ModalManager } from './ModalManager.js';

export class ApiManager {

    fetchPoints() {
        return $.get(`${AppConfig.apiBase}/api/points`);
    }

    addPoint() {
        if ($("#x").val() == "" || $("#y").val() == "" || $("#radius").val() == "") {
            alert("Проверьте введенные данные!")
            return false;
        }
        const newPoint = {
            x: parseFloat($("#x").val()),
            y: parseFloat($("#y").val()),
            color: $("#color").val(),
            radius: parseFloat($("#radius").val())
        };

        $.ajax({
            url: `${AppConfig.apiBase}/api/points/add`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(newPoint)
        })
            .done(() => window.App.loadPoints())
            .fail((error) => {
                console.error("Ошибка при добавлении точки:", error)
            });
    }


    deletePoint(point) {
        if (confirm("Удалить эту точку?")) {
            $.ajax({
                url: `${AppConfig.apiBase}/api/points/${point.id}`,
                type: "DELETE",
                success: () => window.App.loadPoints(),
                error: err => console.error("Ошибка при удалении:", err)
            });
        }
    }


    dragPoint(point, newPos) {
        const payload = {
            id: point.id,
            x: newPos.x,
            y: newPos.y,
            radius: point.radius,
            color: point.color
        };

        $.ajax({
            url: `${AppConfig.apiBase}/api/points/${point.id}`,
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: () => {
                window.App.loadPoints();
            },
            error: err => console.error("Ошибка при перемещении точки:", err)
        });
    }


    savePoint() {
        if ($('#pointRadius').val() == "") {
            alert("Проверьте введенные данные!")
            return false;
        }
        const point = $('#pointModal').data('point');
        const payload = {
            id: point.id,
            x: point.x,
            y: point.y,
            radius: $('#pointRadius').val(),
            color: $('#pointColor').val()
        };

        $.ajax({
            url: `${AppConfig.apiBase}/api/points/${point.id}`,
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: () => {
                ModalManager.closePointModal();
                window.App.loadPoints();
            },
            error: err => console.error("Ошибка при сохранении точки:", err)
        });
    }


    saveComment() {
        if ($('#commentText').val() == "") {
            alert("Проверьте введенные данные!")
            return false;
        }
        const pointId = $('#commentModal').data('pointId');
        const commentId = $('#commentModal').data('commentId');
        const payload = {
            text: $('#commentText').val(),
            backgroundColor: $('#commentColor').val(),
            pointId
        };

        if (commentId) payload.id = commentId;
        const method = commentId ? 'PUT' : 'POST';
        const url = commentId
            ? `${AppConfig.apiBase}/api/comments/${commentId}`
            : `${AppConfig.apiBase}/api/comments/add`;

        $.ajax({
            url,
            method,
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: () => {
                ModalManager.closeCommentModal();
                window.App.loadPoints();
            },
            error: err => console.error("Ошибка при сохранении комментария:", err)
        });
    }

}
