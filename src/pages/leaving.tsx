import styles from "@/styles/attendance.module.css";
import Button from "@/components/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Person = {
    name: string;
    seatID: string;
    rank: string;
    teacher: string;
};

export default function Leaving() {
    const router = useRouter();
    const targetId = router.query.id;
    const position = typeof targetId === "string" ? targetId.split("_")[0] + "の" + targetId.split("_")[1] + "番": "";
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (typeof targetId === "string" && targetId) {
            fetch("/people.json")
                .then((response) => response.json())
                .then((data: Person[]) => {
                    const person = data.find((p) => p.seatID === targetId);
                    if (person) {
                        setName(person.name);
                    } else {
                        console.warn("No matching person found for targetId:", targetId);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching people.json:", error);
                });
        }
    }, [targetId]);

    const leaveChair = async () => {
        if (typeof targetId !== "string") {
            alert("無効なIDです。");
            return;
        }

        try {
            const response = await fetch("/people.json");
            const data: Person[] = await response.json();

            const updatedData = data.map((person) =>
                person.seatID === targetId ? { ...person, seatID: "" } : person
            );

            await fetch("/api/update-people", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ people: updatedData }),
            });

            router.push("/");
        } catch (error) {
            console.error("Error updating people.json:", error);
            alert("データの更新中にエラーが発生しました。");
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.room}>
                <div className={styles.looseLeaf}>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={styles.square}><div className={styles.hole}></div></div>
                    ))}
                </div>
                <div className={styles.main}>
                    <div className={styles.row}><h2 className={styles.h2}>帰宅予定座席</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>{position}</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}></h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>{name} さん</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>今日もお疲れ様でした。</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>またの登校を待っていますね。</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}></h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>本当に帰宅しますか?</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>帰宅するなら帰宅ボタンをクリック。</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}></h2></div>
                    <div className={styles.area}>
                        <Button text="戻る" width="10%" onClick={() => router.push("/")}/>
                        <Button text="確定" width="10%" onClick={() => leaveChair()}/>
                    </div>
                </div>
                <div className={styles.looseLeaf}></div>
            </div>
        </div>
    )
}

Leaving.getLayout = (page: React.ReactNode) => page;