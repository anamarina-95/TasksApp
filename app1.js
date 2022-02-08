let wrapper = document.querySelector("#hiddendiv");
let addtask = document.querySelector(".changespace");
let deltask = document.querySelector(".deletetasks");
let bannercontent = document.querySelector(".banner");
let banner = document.querySelector(".bannerbutton");

banner.addEventListener("click", bannerGone);
function bannerGone() {
  bannercontent.style.display = "none";
  bannercontent.remove();
  addtask.style.display = "block";
  deltask.style.display = "block";
}

let emptylist = [];

function onSave(e) {
  e.preventDefault();
  let id = $(e.currentTarget).data("id");
  let text = $(`#${id} .addtext`).val();
  let input = $(`#${id} .addtext`);
  // console.log(input)
  let currenttask = emptylist.find((item) => item.id === id);
  if (!text.trim().length) {
    return;
  }
  if (currenttask) {
    currenttask.txt = text;
  } else if (
    input.attr("style") &&
    input.attr("style").indexOf("text-decoration:") !== -1
  ) {
    if (currenttask) {
      currenttask.txt = text;
      currenttask.checked = true;
    } else {
      emptylist.push({ id, txt: text, checked: true });
    }
  } else {
    emptylist.push({ id, txt: text, checked: false });
  }

  localStorage.setItem("allEntries", JSON.stringify(emptylist));
}

function onCheck(e) {
  e.preventDefault();
  let id = $(e.currentTarget).data("id");
  let input = $(`#${id} .addtext`).val();
  let text = $(`#${id} .addtext`);
  if (!input.trim().length) {
    return;
  } else {
    text.css("text-decoration", "line-through");
    const ref = localStorage.getItem("allEntries");
    if (ref) {
      emptylist = JSON.parse(ref);
      emptylist.forEach((item) => {
        if (item.id === id) {
          item.checked = true;
        }
        localStorage.setItem("allEntries", JSON.stringify(emptylist));
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const ref = localStorage.getItem("allEntries");
  if (ref) {
    bannerGone();
    emptylist = JSON.parse(ref);
    emptylist.forEach((item) => {
      let b = item.id;
      let div = document.createElement("div");
      div.innerHTML = taskComponent(b);
      wrapper.appendChild(div);
      taskComponent(b);
      let text = $(`#${b} .addtext`);
      text.val(item.txt);
      if (item.checked === true) {
        text.css("text-decoration", "line-through");
      }
    });
  }
});

function taskComponent(id) {
  return `<div class='div-data-container' id = ${id}>
            <textarea type="text" class="addtext"></textarea>
            <div class="imagecontainer">
             <div><button class="savedata" onClick="onSave(event)" data-id="${id}" type="submit"><img src='./Images/image3.png' alt='save'/><button></div>
             <div><button id="checkdiv" onClick="onCheck(event)" data-id="${id}"><img src='./Images/image1.png' alt='done'/><button></div>
             <div><button id="deletediv" onClick="onDelete(event)" data-id="${id}"><img src='./Images/image2.png' alt='delete'/><button></div>
            </div>
           </div>`;
}

addtask.onclick = (e) => {
  e.preventDefault();
  let div = document.createElement("div");
  let b = Date.now();
  div.innerHTML = taskComponent(b);
  wrapper.appendChild(div);
};

function onDelete(e) {
  e.preventDefault();
  const ref = localStorage.getItem("allEntries");
  emptylist = JSON.parse(ref);

  let id = $(e.currentTarget).data("id");
  if (emptylist && emptylist.length) {
    emptylist.splice(
      emptylist.findIndex((a) => a.id === id),
      1
    );
    localStorage.setItem("allEntries", JSON.stringify(emptylist));
  }

  if (emptylist == "") {
    // localStorage.setItem("allEntries", "[]");
    localStorage.removeItem("allEntries");
    bannercontent.style.display = "block";
  }
  $(e.target).closest("div.div-data-container").remove();
}

deltask.onclick = (e) => {
  e.preventDefault();
  function deletediv() {
    wrapper.innerHTML = "";
    localStorage.clear();
    function timedRefresh(timeoutPeriod) {
      setTimeout("location.reload(true);", timeoutPeriod);
    }
    window.onload = timedRefresh(500);
  }
  deletediv();
};
