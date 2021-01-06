import axios from "axios";
import qs from "qs";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export const getAddressLatLng = async (source, args, context, info) => {
    let search = args.search;

    let searchEncode = encodeURIComponent(search);

    let address = "";
    let full_address = "";
    let lat = 0;
    let lng = 0;

    try {
        let searchLatLng = await axios.get(`https://www.google.com/maps/search/${searchEncode}`);
        let domLatLng = new JSDOM(searchLatLng.data);
        let metaLatLngContent = domLatLng.window.document.querySelector("meta[itemprop=image]").getAttribute("content");
        let latLngUrl = new URL(metaLatLngContent);
        let latLng = latLngUrl.searchParams.get('center');
        let latLngSplit = latLng.split(",");
        lat = Number(latLngSplit[0]);
        lng = Number(latLngSplit[1]);
    } catch (e) {
        console.log("metaLatLng", e);
    }

    try {
        let searchPlace = await axios.get(`https://www.google.com/maps/place/${searchEncode}`);
        let domPlace = new JSDOM(searchPlace.data);
        let metaPlaceContent = domPlace.window.document.querySelector("meta[itemprop=description]").getAttribute("content");

        address = metaPlaceContent;
        if (metaPlaceContent.includes(search)) {
            full_address = metaPlaceContent;
        } else {
            full_address = `${search}, ${metaPlaceContent}`;
        }

    } catch (e) {
        console.log("metaPlace", e);
    }


    return {
        address: address,
        full_address: full_address,
        lat: lat,
        lng: lng,
    };
}