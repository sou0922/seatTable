import { useState, useEffect } from "react";
import styles from "@/styles/chair.module.css";
import { useRouter } from "next/router";

type Props = {
    id: string;
    name: string;
    rank: string;
};

export default function Chair({ id, name, rank }: Props) {
    const router = useRouter();
    const [type, setType] = useState<string>("none");

    // 状態を更新するロジックを useEffect 内に移動
    useEffect(() => {
        if (id === "0") {
            setType("none");
        } else if (name === "") {
            setType("available");
        } else {
            setType("occupied");
        }
    }, [id, name]); // id と name が変更されたときにのみ実行

    const move = () => {
        if (name === "") {
            router.push(`/attendance?id=${id}`);
        } else {
            router.push(`/leaving?id=${id}`);
        }
    };

    return (
        <div key={id} className={`${styles.chair} ${styles[type] || "none"}`} onClick={id !== "0" ? () => move() : undefined}>
            <p>{id === "0" ? "" : id} {name}</p>
            <p>{rank}</p>
        </div>
    );
}