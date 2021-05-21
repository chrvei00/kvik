/**
 * Bubbly - Bootstrap 5 Dashboard & CMS Theme v. 1.0.0
 * Homepage:
 * Copyright 2021, Bootstrapious - https://bootstrapious.com
 */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const dataTable = new simpleDatatables.DataTable("#datatable1", {
        searchable: false,
    });

    function adjustTableColumns() {
        let columns = dataTable.columns();

        if (window.innerWidth > 900) {
            columns.show([2, 3, 4, 5]);
        } else if (window.innerWidth > 600) {
            columns.hide([4, 5]);
            columns.show([2, 3]);
        } else {
            columns.hide([2, 3, 4, 5]);
        }
    }

    adjustTableColumns();

    window.addEventListener("resize", adjustTableColumns);
});
