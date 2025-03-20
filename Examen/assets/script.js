const d = document, $body = d.querySelector("body"), $div=d.querySelector("div");

( async () => {
    
    try {
        let res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.791214034024364&longitude=0.8069330868713083&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m");
        let marquesJSON = await res.json();
        let $table = d.createElement("table");
        let $encabezaments = `        <tr>
                <th>Latitut</th>
                <th>Longitud</th>
                <th>Timezone</th>
                <th>Elevation</th>
                <th>Current_units</th>
                <th>Hourly_units</th>
            </tr>`;
            $table.innerHTML = $encabezaments;
        console.log(marquesJSON);
        let $linea = `        <tr>
                <td>${marquesJSON.latitude}</td>
                <td>${marquesJSON.longitude}</td>
                <td>${marquesJSON.timezone}</td>
                <td>${marquesJSON.elevation}</td>
                <td>${marquesJSON.current_units.time}-${marquesJSON.current_units.interval}-${marquesJSON.current_units.temperature_2m}-${marquesJSON.current_units.wind_speed_10m}</td>
                <td>${marquesJSON.hourly_units.wind_speed_10m}-${marquesJSON.hourly_units.time}-${marquesJSON.hourly_units.temperature_2m}-${marquesJSON.hourly_units.relative_humidity_2m}</td>
            </tr>`;
        $table.querySelector("tbody").insertAdjacentHTML("beforeend", $linea);
        $body.insertAdjacentElement("afterbegin", $table);
        let $taula2= d.createElement("table");
        $encabezaments = `        <tr>
                <th>Hora</th>
                <th>Temperatura</th>
            </tr>`;
            $taula2.innerHTML = $encabezaments;
        console.log(marquesJSON.hourly.time);
        console.log(marquesJSON.hourly.temperature_2m);
        let i = 0;
        const $fragment = d.createDocumentFragment();
        while(i<168){
            let $tr = d.createElement("tr");
            let $linea = `        
                <td>${marquesJSON.hourly.time[i]}</td>
                <td>${marquesJSON.hourly.temperature_2m[i]}</td>
            `;
            $tr.innerHTML = $linea;
            $fragment.appendChild($tr);
            i++;
        }
        console.log($fragment);
        $taula2.querySelector("tbody").appendChild($fragment);
        $div.insertAdjacentElement("afterbegin", $taula2);
        console.log($taula2);
        


        
    } catch (error) {
        let message = error.statusText || "S'ha produit un error";
        $body.insertAdjacentHTML(
          "beforeend",
          `<p><b>${error.status}:${message}</b></p>`
        );
    }
    
      })(); /* Aixo en una funcio autoexecutable */

