if (document.getElementById("searchInput")) {
  document.getElementById("searchInput").addEventListener("keyup", () => {
    searchFilter();
    filter();
  });
}

if (document.getElementById("filter")) {
  document.getElementById("filter").addEventListener("click", () => {
    searchFilter();
    filter();
  });
}

if (document.getElementById("resetFilter")) {
  document.getElementById("resetFilter").addEventListener("click", resetFilter);
}

function resetFilter() {
  document.getElementById("rekList").style.flexDirection = "";
  document.getElementById("searchInput").value = "";
  ul = document.getElementById("reklamasjonsList");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    li[i].style.display = "";
  }
  return;
}

function filter() {
  const store = document.getElementById("sortStore").value;
  const order = document.getElementById("sortOrder").value;

  ul = document.getElementById("reklamasjonsList");
  li = ul.getElementsByTagName("li");

  if (order == "old") {
    document.getElementById("rekList").style.flexDirection = "column-reverse";
  } else {
    document.getElementById("rekList").style.flexDirection = "";
  }

  if (store == "" && document.getElementById("searchInput").value == "") {
    for (i = 0; i < li.length; i++) {
      li[i].style.display = "";
    }
    return;
  } else if (
    store == "" &&
    document.getElementById("searchInput").value != ""
  ) {
    return;
  }
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("caseNumber")[0];
    caseNumber = parseInt(a.textContent || a.innerText);
    if (parseInt(store) + 1000 >= caseNumber && parseInt(store) < caseNumber) {
    } else {
      li[i].style.display = "none";
    }
  }
}

function searchFilter() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchInput").value.toUpperCase();
  filter = document.getElementById("searchFilter").value;
  ul = document.getElementById("reklamasjonsList");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    if (filter == "") {
      a = li[i].getElementsByTagName("a")[0];
    } else {
      a = li[i].getElementsByClassName(filter)[0];
    }
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(input) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

if (document.querySelector(".flash")) {
  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      document.querySelector(".flash").style.display = "none";
    }
  });
}

if (document.getElementById("myModal")) {
  var myModal = document.getElementById("myModal");
  var myInput = document.getElementById("myInput");
  myModal.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
}

if (document.getElementById("kopierReklamasjonLink")) {
  document
    .getElementById("kopierReklamasjonLink")
    .addEventListener("click", kopierLink);
}
function kopierLink() {
  const reklamasjonLink = document.getElementById("reklamasjonLink");
  reklamasjonLink.select();
  reklamasjonLink.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
