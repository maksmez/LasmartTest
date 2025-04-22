export class KendoGrid {
  constructor(gridId = '#pointsGrid') {
    this.gridId = gridId;
  }

  setupGrid(points) {
    $(this.gridId).kendoGrid({
      dataSource: {
        data: points,
        pageSize: 7
      },
      pageable: true,
      columns: [
        { field: "id", title: "ID" },
        { field: "x", title: "X" },
        { field: "y", title: "Y" },
        { field: "radius", title: "Радиус" },
        { 
          field: "color", 
          title: "Цвет",
          template: (dataItem) => {
            const color = dataItem.color || '#CCCCCC';
            return `
              <div style="
                width: 40px;
                height: 20px;
                background-color: ${color};
                border: 1px solid #333;
                margin: 0 auto;
              "></div>
            `;
          }
        }
      ]
    });
  }

  updateGridData(points) {
    const grid = $(this.gridId).data("kendoGrid");
    if (grid) {
      grid.dataSource.data(points);
    }
  }
}