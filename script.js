require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/widgets/Legend",
], function(Map, FeatureLayer, MapView, Legend) {

  // Create the map
  var map = new Map({
    basemap: "hybrid"
  });

  // Create the MapView
  var view = new MapView({
    container: "viewDiv",
    map: map,
    center:[-93.55, 41.595],
    zoom: 15
  });

  // Define popup template to display attributes from buildings layer
  var buildingTemplate = {
    title: "Building: {Name}",
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "NickName",
        label: "Building Nick Name",
      }, {
        fieldName: "Purpose",
        label: "Purpose",
      }, {
        fieldName: "YearBuilt",
        label: "Year Built",
      }, {
        fieldName: "A_C",
        label: "Is the building air conditioned?",
      }, {
        fieldName: "AddtlInfo",
        label: "Additional Information",
      }]
    }]
  };

  // Create FeatureLayer for buildings
  var buildingsLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Buildings_and_Structures/FeatureServer/0",
    popupTemplate: buildingTemplate,
  });


  // Define popup template to display attributes from tram line layer
  var tramTemplate = {
    title: "Tram Route",
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "Direction",
        label: "Direction",
      }, {
        fieldName: "Hours",
        label: "Hours of Operation",
      }, {
        fieldName: "AddtlInfo",
        label: "Additional Information",
      }]
    }]
  };

  // Create FeatureLayer for tram line 
  var tramLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Tram_Lines_SmoothLine/FeatureServer",
    popupTemplate: tramTemplate
  });
  
   // Define popup template to display attributes from entrances layer
  var entrancesTemplate = {
    title: "Gate# {GateNum}",
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "GateType",
        label: "Gate Type",
      }, {
        fieldName: "Road",
        label: "Nearest Road",
      }, {
        fieldName: "Tix",
        label: "Can tickets for entry be purchased at this gate?",
      }, {
        fieldName: "AddtlInfo",
        label: "Additional Information",
      }]
    }]
  };

   // Create FeatureLayer for entrances
  var entrancesLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Entrances/FeatureServer",
    popupTemplate: entrancesTemplate,
  });

  // Add layers to map
  map.add(buildingsLayer);
  map.add(tramLayer)
  map.add(entrancesLayer);
  
  // Add Legend widget to view
  view.when(function() {
    var legend = new Legend({
      view: view
    });
    view.ui.add(legend, "top-right")
  });  
});