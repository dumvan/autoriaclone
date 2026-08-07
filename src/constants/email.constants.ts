import {EmailEnum} from "../enums/generalEnums/email.enum.js";

export const emailConstants = {
    [EmailEnum.WELCOME]: {
        subject: "Ласкаво просимо на нашу платформу",
        template: "welcome"
    },
    [EmailEnum.FORGOT_PASSWORD]: {
        subject: "Відновлення пароля",
        template: "forgot.password"
    }
}