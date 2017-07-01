var dataPath = "static/data/russian_english.json";
var dataCyr;



function addItem(cyr,resp, trans){
  var cyr = $("#cyrillic").val().trim();
  var lat = $("#latin").val().trim();
  var tra = $("#translation").val().trim();
  var level = $("#level option:selected").val().trim();



  var itemRUtoEN = {};
  itemRUtoEN["question"] = cyr
  itemRUtoEN["answer"] = lat
  itemRUtoEN["translation"] = tra
  itemRUtoEN["information"] = cyr + " ("+lat+"): (en) "+tra

  var itemENtoRU = {};
  itemENtoRU["question"] = lat
  itemENtoRU["answer"] = cyr
  itemENtoRU["information"] = lat + " ("+cyr+"): (en) "+tra

  var itemTRAtoRU = {};
  itemTRAtoRU["question"] = tra
  itemTRAtoRU["answer"] = cyr
  itemTRAtoRU["transcript"] = lat
  itemTRAtoRU["information"] = cyr + " ("+lat+"): (en) "+tra

  var itemRUtoTRA = {};
  itemRUtoTRA["question"] = cyr
  itemRUtoTRA["answer"] = tra
  itemRUtoTRA["transcript"] = lat
  itemRUtoTRA["information"] = cyr + " ("+lat+"): (en) "+tra

  dataCyr["ru_to_en"][level][cyr] = itemRUtoEN
  dataCyr["en_to_ru"][level][lat] = itemENtoRU
  dataCyr["trad_to_ru"][level][tra] = itemTRAtoRU
  dataCyr["ru_to_trad"][level][cyr] = itemRUtoTRA

  refreshData();
}

function refreshData(){
  $(".result_container textarea").html(JSON.stringify(dataCyr, null,2))
}

$(document).ready(function(){
  console.log("ok");
  $.getJSON(dataPath , function( data ) {
    dataCyr = data;
    refreshData();
  });
  $('select').material_select();
});
