import {RegexBuilder} from "../../regExp/regExp.js";

export const ReportedVehicleRegexpEnum = {
    MAKE_NAME: new RegexBuilder().withLatin().withCyrillic().withSpace().withNumbers().withSymbols("-").build(),
    MODEL_NAME: new RegexBuilder().withLatin().withCyrillic().withSpace().withNumbers().withSymbols("-").build(),
    VEHICLE_TYPE: new RegexBuilder().withLatin().withCyrillic().build()
}