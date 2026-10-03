const paintPicker = document.querySelector("#paint-color");
const paintPreview = document.querySelector("#paint-preview");

paintPicker.addEventListener("input", () => {
  paintPreview.style.backgroundColor = paintPicker.value;
});

const paintReset = document.querySelector("#paint-reset");
paintReset.addEventListener("click", () => {paintPicker.value = "#8054ff";
paintPreview.style.backgroundColor = "#8054ff";
})