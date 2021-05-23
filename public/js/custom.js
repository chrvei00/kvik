function searchFilter() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("reklamasjonsList");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
    function buttonFilter(filter) {
    // Declare variables
    var ul, li, value, i, element;
    ul = document.getElementById("reklamasjonsList");
    li = ul.getElementsByTagName('li');
  
    for (i = 0; i < li.length; i++) {
      element = li[i];
        if (element.className == filter || filter == "") {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    };
  }