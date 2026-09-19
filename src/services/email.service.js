import { trasnporter } from "../config/mailerConfig.js";

let from  = process.env.MAIL_FROM
export class EmailService{

    async sendTicketConfirmation(user, event, ticket){
        return this.#send({
            to: user.email,
            subject: "Incripcion confimada",
            html: `... <strong>${ticket.reservationCode}</strong> ...
            <h3>${event.title}</h3>
            <p>${new Date(event.date).toLocaleString()} · ${event.location}</p>
            <p>Lugares: ${ticket.quantity}</p>`
        });
    }

    async sendTicketCancellation(user, event, ticket){
        return this.#send({
            to: user.email,
            subject: "Inscripción cancelada",
            html: `... el código <strong>${ticket.reservationCode}</strong> fue cancelado ...`
        });
    }

    async #send({to, subject, html}){
        try {
            const info =  await trasnporter.sendMail({from, to, subject, html})
            console.log("Email enviado:", info.messageId)
            return info

        } catch (error) {
            console.log("Error al enviar el mensaje", error.message)
            return null
        }
    }
}