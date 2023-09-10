import Ticket from "../components/Ticket";

export default function UnsolvedTickets() {
    return (
        <div className="cstm-paged flex-col justify-start gap-4">
            <h1 className="text-center w-full tex">Unsolved tickets</h1>
            <Ticket
                name="Rohan Basnet"
                label="OWNER"
                message="Hello everyone! I was travelling from Butwal to Kathmandu on 28th August, 2023. I lost my citizenship
                around buspark area. Please if anyone has found it, upload it here! It is very urgent for me because I
                have to return Butwal in 3 days."
                date="30 Aug, 2023"
            />
            <Ticket
                name="Samir Maharjan"
                label="OWNER"
                message="I lost my wallet at Purple Haze club yesterday. I have some amount of money as well as my driving
                license in there. So please if anyone has found it, return to me. You can keep the money for yourself as 
                a gesture for helping."
                date="2 Sep, 2023"
            />
            <Ticket
                name="Usha Bastola"
                label="FINDER"
                message="I have found Passport of Mr. Nabin Bhattarai at Bir Hospital along with some bills inside it. The
                document is safe with me, if you want please submit a new ticket and you will get my information on your email as
                I can't share it publicly here."
                date="3 Sep, 2023"
            />
            <Ticket
                name="Aarnav Shrestha"
                label="FINDER"
                message="Yesterday when I was travelling from Baneshor area to Bhaktapur on bike, I lost my wallet which
                has my bike driving license in there along with some cards of Hospital. Please if anyone has found it, return
                it to me, I will provide Rs.2000 for you as a gesture for helping."
                date="5 Sep, 2023"
            />
        </div>
    )
}
