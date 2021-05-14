var xhr1 = new XMLHttpRequest();
xhr1.withCredentials = true;

xhr1.open("GET", "https://api.covid19api.com/live/country/india",true);

xhr1.onload = function () {
    if (this.status === 200) {
        let covidData1 = JSON.parse(this.responseText);
            // console.log(covidData1);

            covidData1.forEach(function(element){
                cases = element.Active;
                if (cases<2000){
                    color = "rgb(255, 0, 0)";
                }
                else if(cases>200 && cases<10000)
                {
                    color = "rgb(121, 0, 0)";
                }
                else
                {
                    color = "rgb(0, 0, 0)";
                }
                // Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                }).setLngLat([element.Lon, element.Lat])
                .addTo(map);
            });
      }
}

xhr1.send();
let tableData = document.getElementById("tableData");
let topdata = document.getElementById("notes");

var xhr = new XMLHttpRequest();

xhr.open(
  "GET",
  "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
  true
);

xhr.onload = function () {
  if (this.status === 200) {
    let covidData = JSON.parse(this.responseText);
    let regions = covidData.regionData;
    // console.log(regions);
    let cdata = `<div class="card mx-4 my-4 active" style="width: 18rem">
                <div class="card-body cardb">
                  <h5 class="card-title">ACTIVE</h5>
                  <p class="card-text">
                    ${covidData.activeCases}
                  </p>
                </div>
              </div>
              <div class="card mx-4 my-4 recovered" style="width: 18rem">
                <div class="card-body cardb">
                  <h5 class="card-title">RECOVERED</h5>
                  <p class="card-text">
                  ${covidData.recovered}
                  </p>
                </div>
              </div>
              <div class="card mx-4 my-4 deaths" style="width: 18rem">
                <div class="card-body cardb">
                  <h5 class="card-title">DEATHS</h5>
                  <p class="card-text">
                  ${covidData.deaths}
                  </p>
                </div>
              </div>
              <div class="card mx-4 my-4 cases" style="width: 18rem">
                <div class="card-body cardb">
                  <h5 class="card-title">TOTAL CASES</h5>
                  <p class="card-text">
                    ${covidData.totalCases}
                  </p>
                </div>
              </div>`;

    topdata.innerHTML = cdata;

    var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Active Cases', 'Recovered', 'Deaths'],
        datasets: [{
            label: '# of Votes',
            data: [covidData.activeCases, covidData.recovered, covidData.deaths],
            backgroundColor: [
               
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)'
                
            ],
            borderColor: [
                
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 0.2)'

            ],
            borderWidth: 1
        }]
    },
});

let html = "";
                regions.forEach(function(element,index){
                    let data = `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${element.region}</td>
                    <td>${element.deceased}</td>
                    <td>${element.recovered}</td>
                  </tr>`;
                  html += data;
                });

                tableData.innerHTML = html;
  }
};

xhr.send();


