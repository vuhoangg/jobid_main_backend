"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
exports.getAddressLatLng = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let search = args.search;
    let searchEncode = encodeURIComponent(search);
    let address = "";
    let full_address = "";
    let lat = 0;
    let lng = 0;
    try {
        let searchLatLng = yield axios_1.default.get(`https://www.google.com/maps/search/${searchEncode}`);
        let domLatLng = new JSDOM(searchLatLng.data);
        let metaLatLngContent = domLatLng.window.document.querySelector("meta[itemprop=image]").getAttribute("content");
        let latLngUrl = new URL(metaLatLngContent);
        let latLng = latLngUrl.searchParams.get('center');
        let latLngSplit = latLng.split(",");
        lat = Number(latLngSplit[0]);
        lng = Number(latLngSplit[1]);
    }
    catch (e) {
        console.log("metaLatLng", e);
    }
    try {
        let searchPlace = yield axios_1.default.get(`https://www.google.com/maps/place/${searchEncode}`);
        let domPlace = new JSDOM(searchPlace.data);
        let metaPlaceContent = domPlace.window.document.querySelector("meta[itemprop=description]").getAttribute("content");
        address = metaPlaceContent;
        if (metaPlaceContent.includes(search)) {
            full_address = metaPlaceContent;
        }
        else {
            full_address = `${search}, ${metaPlaceContent}`;
        }
    }
    catch (e) {
        console.log("metaPlace", e);
    }
    return {
        address: address,
        full_address: full_address,
        lat: lat,
        lng: lng,
    };
});
//# sourceMappingURL=get.js.map