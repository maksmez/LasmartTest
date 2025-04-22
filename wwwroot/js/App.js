/* eslint-disable no-undef */
import { KendoGrid } from './KendoGrid.js';
import { KonvaManager } from './KonvaManager.js';
import { ModalManager } from './ModalManager.js';
import { ApiManager } from './ApiManager.js';

export class App {
  constructor() {
    this.points = [];
    this.kendoGrid = new KendoGrid();
    this.konvaManager = new KonvaManager();
    this.apiManager = new ApiManager();
    this.init();
    this.setupModalHandlers();
  }

  init() {
    $(() => {
      this.konvaManager.setupStage();
      this.kendoGrid.setupGrid(this.points);
      this.loadPoints();

      $("#addPoint").on("click", () => this.apiManager.addPoint());
    });
  }

  setupModalHandlers() {
    $('#cancelPoint').on('click', ModalManager.closePointModal);
    $('#savePoint').on('click', this.apiManager.savePoint);

    $('#cancelComment').on('click', ModalManager.closeCommentModal);
    $('#saveComment').on('click', this.apiManager.saveComment);

  }


  loadPoints() {
    this.apiManager.fetchPoints()
      .done((data) => {
        this.points = data;
        this.konvaManager.renderPoints(this.points);
        this.kendoGrid.updateGridData(this.points);
      })
      .fail((error) => {
        console.error("Ошибка загрузки точек:", error);
      });
  }
}

window.App = new App();