import styles from "@/styles/attendance.module.css";
import Button from "@/components/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Student = {
    name: string;
    speedMaster: string;
    inCharge: string;
}

type Chair = {
    id: string;
    bad: string;
    student: Student;
}

export default function Attendance() {
    const router = useRouter();
    const [inChargeList, setInChargeList] = useState<Record<string, Student[]>>({});
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [subCategories, setSubCategories] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const id = router.query.id;
    const position = typeof id === "string" ? id.split("_")[0] + "の" + id.split("_")[1] + "番": "";
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedList = localStorage.getItem("inChargeList");
            setInChargeList(storedList ? JSON.parse(storedList) : {});
        }
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setSubCategories(inChargeList[category] || []);
        setSelectedStudent(null);
    };

    const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const student = subCategories.find(s => s.name === event.target.value) || null;
        setSelectedStudent(student);
    };

    const setChair = () => {
        if (typeof id !== "string" || !selectedStudent) {
            alert("あなたの名前を教えて下さい。");
            return;
        }
    
        if (typeof window === "undefined") return; // サーバーサイドでの実行を防ぐ
    
        // ローカルストレージから現在の chairList を取得
        const chairListJSON = localStorage.getItem("chairList");
        const chairList: Chair[] = chairListJSON ? JSON.parse(chairListJSON) : [];
    
        // 対象の id の chair を更新
        const updatedChairList = chairList.map(chair =>
            chair.id === id ? { ...chair, student: selectedStudent } : chair
        );
    
        // 更新後の chairList をローカルストレージに保存
        localStorage.setItem("chairList", JSON.stringify(updatedChairList));
    
        router.push("/seat");
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
                    <div className={styles.row}><h2 className={styles.h2}>登録予定座席</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>{position}</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}></h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>担当の先生は?</h2></div>
                    <div className={styles.row}>
                        <div className={styles.cp_ipselect06}>
                            <select className={styles.cp_sl06} id="category-select" onChange={handleCategoryChange}>
                                <option>選択してください</option>
                                {Object.keys(inChargeList).map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <span className={styles.cp_sl06_selectbar}></span>
                        </div>
                    </div>
                    <div className={styles.row}><h2 className={styles.h2}></h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>あなたの名前は?</h2></div>
                    <div className={styles.row}>
                        <div className={styles.cp_ipselect06}>
                            <select className={styles.cp_sl06}  id="sub-category-select" disabled={!selectedCategory} onChange={handleStudentChange}>
                                <option>選択してください</option>
                                {subCategories.map((student, index) => (
                                    <option key={index} value={student.name}>{student.name}</option>
                                ))}
                            </select>
                            <span className={styles.cp_sl06_selectbar}></span>
                        </div>
                    </div>
                    <div className={styles.row}><h2 className={styles.h2}></h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>この内容で登録しますか?</h2></div>
                    <div className={styles.area}>
                        <Button text="戻る" width="10%" onClick={() => router.push("/")}/>
                        <Button text="確定" width="10%" onClick={() => setChair()}/>
                    </div>
                </div>
                <div className={styles.looseLeaf}></div>
            </div>
        </div>
    )
}

Attendance.getLayout = (page: React.ReactNode) => page;