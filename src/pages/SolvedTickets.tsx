import Solved from "../components/Solved";

export default function SolvedTickets() {
    return (
        <div className="cstm-paged flex-col justify-start gap-4">

            <h1>Solved tickets</h1>

            <div className="grid grid-cols-4 gap-6 w-full">
                <Solved
                    founder="Pratap Shah"
                    owner="Rohan Basnet"
                    type="Citizenship"
                    date="2 Sep, 2023"
                />

                <Solved
                    founder="Ramesh Baniya"
                    owner="Samir Maharjan"
                    type="License"
                    date="9 Sep, 2023"
                />
            </div>
        </div>
    )
}
