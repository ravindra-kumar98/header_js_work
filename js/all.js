"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //***|1|Drag & Drop||***\\
  const table = document.getElementById("dTable");
  const rows = table.querySelectorAll(".inner_table tr");
  let draggedColumn = null;

  rows.forEach((header, index) => {
    header.setAttribute("draggable", true);
    header.addEventListener("dragstart", (event) => {
      debugger;
      Editable(input)
      draggedColumn = index;
      event.dataTransfer.setData("text/plain", index);
      
    });
    header.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    header.addEventListener("drop", (event) => {
      event.preventDefault();
      const targetIndex = index;
      const sourceIndex = parseInt(event.dataTransfer.getData("text/plain"));
      swapColumns(sourceIndex, targetIndex);
      Editable();
    });
  });

  function swapColumns(sourceIndex, targetIndex) {
    if (
      sourceIndex < 0 ||
      sourceIndex >= rows.length ||
      targetIndex < 0 ||
      targetIndex >= rows.length
    ) {
      return;
    }
    const tempHeader = rows[sourceIndex].innerHTML;
    rows[sourceIndex].innerHTML = rows[targetIndex].innerHTML;
    rows[targetIndex].innerHTML = tempHeader;
  }

  //***|2|Editable cell||***\\
  function Editable() {
    const editableSpans = document.querySelectorAll('.edit_icon');
    editableSpans.forEach(span => {
      let tdValue = span.parentNode.querySelector('label');
      span.addEventListener('click', () => {
        const input = document.createElement('input');
        input.classList.add('editable-input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', tdValue.innerText);
        tdValue.parentNode.replaceChild(input, tdValue);
        input.focus();
        input.addEventListener('blur', () => {
          input.parentNode.replaceChild(tdValue, input);
          tdValue.innerText = input.value;
        });
      });
    });
  }
  Editable();

  //***|3|Change selected attribute||***\\
  const selectElements = document.querySelectorAll("select.form-select");
  selectElements.forEach(function (e) {
    e.addEventListener("change", function () {
      let t = e.options[e.selectedIndex];
      for (let i = 0; i < e.options.length; i++) {
        e.options[i].removeAttribute("selected");
      }
      t.setAttribute("selected", "selected");
    });
  });

  //***|4|Table Save as txt file||***\\
  var saveBtn = document.querySelector('.save_btn');
  saveBtn.addEventListener("click", function () {
    var content = document.getElementById("getTable").innerHTML;
    // if (content.trim().length === 0) {
    //   return; // Do not save empty content
    // }
    // var fileName = "table_content.txt";
    // var blob = new Blob([content], { type: "text/html;charset=utf-8" });
    // if (window.navigator.msSaveOrOpenBlob) {
    //   window.navigator.msSaveOrOpenBlob(blob, fileName);
    // } else {
    //   var a = document.createElement("a");
    //   document.body.appendChild(a);
    //   a.style = "display: none";
    //   var url = window.URL.createObjectURL(blob);
    //   a.href = url;
    //   a.download = fileName;
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // }
  });
});
