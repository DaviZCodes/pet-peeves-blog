import crypto from "crypto";

const SECRET = "PetLoggerBlog19MyBdayInTwoDays" //I'm going to be 20 years old in 2 days! June 26 btw!

export const random = () => {
    return crypto.randomBytes(128).toString("base64");
}

export const authentication = (salt : string, password : string) => {
    return crypto.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest("hex");
}