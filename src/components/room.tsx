import Chair from "./chair";
import styles from "@/styles/room.module.css";
import React, { useEffect, useState } from "react";


type Props = {
    roomName: string;
    layout: string[][];
};

export default function Room({roomName, layout }: Props) {
    const numRows = layout.length;
    const numCols = layout[0]?.length || 0;

    const [people, setPeople] = useState<any[]>([]);

    useEffect(() => {
        const fetchPeople = async () => {
            const response = await fetch("/api/getPeople");
            const data = await response.json();
            setPeople(data);
        };
        fetchPeople();
    }, []);
    
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
                    // `people` 配列から該当する `id` を持つ人を検索
                    const person = people.find((p) => p.id === id);
                    return (<Chair key={id} id={id} name={person ? person.name : ""} rank={person ? person.rank : ""} />);
                })
            )}
            </div>
            </div>
            <div className={styles.looseLeaf}></div>
        </div>
    );
}
