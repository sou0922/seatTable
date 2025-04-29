import Chair from "./chair";
import styles from "@/styles/room.module.css";
import React, { useEffect, useState } from "react";

type Props = {
    roomName: string;
    layout: string[][];
};

type Person = {
    seatID: string;
    name: string;
    rank: string;
    occupied?: boolean;
};

export default function Room({roomName, layout }: Props) {
    const numRows = layout.length;
    const numCols = layout[0]?.length || 0;

    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        const fetchPeople = async () => {
            const response = await fetch("/api/getPeople");
            const data: Person[] = await response.json();
            setPeople(data);
        };
        fetchPeople();
    }, [layout]);
    
    return (
        <div className={styles.room}>
            <div className={styles.looseLeaf}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={styles.square}><div className={styles.hole}></div></div>
                ))}
            </div>
            <div className={styles.main}>
                <h2 className={styles.title}>{roomName}</h2>
                <div className={styles.area} style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)`, gridTemplateRows: `repeat(${numRows}, 1fr)`}} >
                {layout.map((row, rowIndex) =>
                    row.map((id, columnIndex) => {
                        const person = people.find((p) => p.seatID === id);
                        return (
                            <Chair key={`${rowIndex}-${columnIndex}`} id={id} name={person ? person.name : ""} rank={person ? person.rank : ""} />
                        );
                    })
                )}
            </div>
            </div>
            <div className={styles.looseLeaf}></div>
        </div>
    );
}
