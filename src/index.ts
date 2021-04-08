import * as fs from 'fs';
import * as rm from 'typed-rest-client/RestClient';
import notifier = require('node-notifier');
import { TurboVaxRootObject } from './types';

let rest: rm.RestClient = new rm.RestClient('rest-samples');
let eTagTurbo = fs.readFileSync('turboVaxEtag.txt').toString();

async function runTurboVax() {

    let res: rm.IRestResponse<TurboVaxRootObject>;
    try {
        res = await rest.get<TurboVaxRootObject>('https://api.turbovax.info/dashboard', {
            additionalHeaders: {
                "if-none-match": eTagTurbo,
            },
        });
    } catch (error) {
        console.log(error);
        return;
    }

    console.log("TurboTax  " + res.statusCode);

    console.log(`Current ETag: ${eTagTurbo}`);
    eTagTurbo = (res.headers as any)['etag'];
    console.log(`New ETag: ${eTagTurbo}`);
    fs.writeFileSync('turboVaxEtag.txt', eTagTurbo);

    const lastUpdated = res.result?.last_updated_at;
    console.log(`Last Updated: ${lastUpdated}`)


    const availableLocations = res.result?.locations.filter(
        loc => loc.appointments.count > 0
            && ["Queens", "Brooklyn", "Manhattan"].includes(loc.area)
            && loc.id !== "York College (Queens residents only)"
        //   && loc.available
        //   && loc.active
    );

    if (!availableLocations?.length) {
        return;
    }

    notifier.notify({
        title: "TurboTax: Found Appointment",
        message: JSON.stringify(availableLocations, null, 2)
    })
    console.log(JSON.stringify(availableLocations, null, 2));

}

setInterval(runTurboVax, 5000, runTurboVax)