import { useState, useEffect } from "react";
import styles from "@/styles/chair.module.css";
import { useRouter } from "next/router";

type Props = {
    id: string;
};

type ChairData = {
    student: { name: string; speedMaster?: string };
    bad?: string;
};

export default function Chair({ id }: Props) {
    const router = useRouter();
    const [targetId, setTargetId] = useState<string>(id);
    const [selectedChair, setChair] = useState<ChairData | null>(null);
    const [type, setType] = useState<string>("none");

    const move = () => {
        // 座席に学生情報がある場合
        if(selectedChair?.student) {
            router.push(`/leaving?id=${targetId}`)
        }
        // 座席に学生情報がない場合
        else {
            router.push(`/attendance?id=${targetId}`)
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedChair = JSON.parse(localStorage.getItem("chairList") || "[]");
            for(const chair of storedChair) {
                if(chair.id == targetId) {
                    if(chair.student) {
                        switch (chair.student.speedMaster) {
                            case "英単語1200":
                                chair.student.speedMaster = "★"
                                break;
                            case "英単語1800":
                                chair.student.speedMaster = "★★"
                                break;
                            case "英熟語750":
                                chair.student.speedMaster = "★★★"
                                break;
                            case "英文法750":
                                chair.student.speedMaster = "★★★★"
                                break;
                            case "例文300":
                                chair.student.speedMaster = "★★★★★"
                                break;
                            case "上級英単語1000":
                                chair.student.speedMaster = "★★★★★★"
                                break;
                            case "上級英熟語":
                                chair.student.speedMaster = "★★★★★★★"
                                break;
                        }
                    }
                    setChair(chair);
                }
            }
        }
    }, [targetId]);

    useEffect(() => {
        if(targetId !== "0") {
            if(selectedChair) {
                setType("availabe");
                if (selectedChair.student?.name) {
                    setType("occupied");
                }
                else if (selectedChair.bad) {
                    setType("attention");
                }
            }
        }
        else {
            setTargetId("");
        }
    })

    return (
        <div key={targetId} className={`${styles.chair} ${styles[type] || "none"}`} onClick={targetId !== "" ? () => move() : undefined} >
            <p>{targetId} {selectedChair?.student?.name || ""}</p>
            <p>{selectedChair?.student?.speedMaster ?? selectedChair?.bad ?? ""}</p>
        </div>
    );
}
