$(document).ready(function () {
  // Line up our Audio API goodness
  var audioContext = new (window.AudioContext || window.webkitAudioContext)(),
      audioElement = document.getElementById('audioElement'),
      audioSource = audioContext.createMediaElementSource(audioElement),
      analyser = audioContext.createAnalyser();

  // Bind our analyser to the media element source.
  audioSource.connect(analyser);
  audioSource.connect(audioContext.destination);

  var frequencyData = new Uint8Array(100);

  var svgWidth = '1000';
  var barPadding = '1';
  var colorSpectrum = [];

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min));
  }

  // Generate array of random colors
  for (var i = 0; i < 255; i++) {
    colorSpectrum[i] = 'rgb(' + randInt(0, 255) + ',' + randInt(0, 255) + ',' + randInt(0, 255) + ')';
  }

  var r = 200,
    w = r * 3,
    h = w,
    rad = Math.PI/180,
    interval = 360/frequencyData.length;

    // d3.select

  var lEye = d3.select('#svg-land')
      .append('svg')
      .attr('id', 'left-eye')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('fill', "rgb(255,0,0)")
      .attr('transform', 'translate(' + r + ',' + r + ')');

  var rEye = d3.select('#svg-land')
      .append('svg')
      .attr('id', 'right-eye')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('fill', "rgb(255,0,0)")
      .attr('transform', 'translate(' + r + ',' + r + ')');

  lEye.selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('width', svgWidth / frequencyData.length - barPadding)
    .attr('transform', function (d, i) {
      var t1 = ((w/2-r) * Math.cos((interval*i) * Math.PI/180)),
          t2 = ((w/2-r) * Math.sin((interval*i) * Math.PI/180));
       // This is awful, but I don't yet know of a better way to chain transforms
       return "translate(" + t1 + "," + t2 + ") rotate(" + 45 + ")";
     });

  rEye.selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('width', svgWidth / frequencyData.length - barPadding)
    .attr('transform', function (d, i) {
      var t1 = ((w/2-r) * Math.cos((interval*i) * Math.PI/180)),
          t2 = ((w/2-r) * Math.sin((interval*i) * Math.PI/180));
       // This is awful, but I don't yet know of a better way to chain transforms
       return "translate(" + t1 + "," + t2 + ") rotate(" + -45 + ")";
    });

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 chart with new data.
     var r,g,b;
     lEye.selectAll('rect')
        .data(frequencyData)
        .attr('height', function(data) {
          return data;
        })
        .attr('fill', function(data) {
          return colorSpectrum[data];
        });
      rEye.selectAll('rect')
         .data(frequencyData)
         .attr('height', function(data) {
           return data;
         })
         .attr('fill', function(data) {
           return colorSpectrum[data];
         });
  }
  // Run the loop
  renderChart();
});
