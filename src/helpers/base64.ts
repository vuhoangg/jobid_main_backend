import crypto from "crypto";
import fs from "fs";

export const detectType = (base64: string) => {
    const result = base64.match(/[^:/]\w+(?=;|,)/)[0];
    if (result === "+xml") {
        return "svg";
    } else {
        return result;
    }
};

export const convertBase64toImage = async (base64: string) => {
    const base64Data = base64.substr(base64.indexOf(",") + 1);
    const time = Date.now();
    const random = crypto.randomBytes(10).toString("hex");
    const name = time + "_" + random;
    await fs.writeFileSync(`storage/static/${name}.${detectType(base64)}`, base64Data, "base64");
    return name;
};
