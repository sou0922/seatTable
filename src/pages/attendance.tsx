import styles from "@/styles/attendance.module.css";
import Button from "@/components/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Person = {
    name: string;
    seatID: string;
    rank: string;
    teacher: string;
}

export default function Attendance() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedName, setSelectedName] = useState<string>("");
    const [people, setPeople] = useState<Person[]>([]);
    const [teachers, setTeachers] = useState<string[]>([]);
    const [filteredNames, setFilteredNames] = useState<string[]>([]);
    const id = router.query.id;
    const position = typeof id === "string" ? id.split("_")[0] + "の" + id.split("_")[1] + "番": "";

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await fetch("/people.json");
                const data = (await response.json()) as Person[];
                setPeople(data);
                const uniqueTeachers = Array.from(new Set(data.map((person) => person.teacher)));
                setTeachers(uniqueTeachers);
            } catch (error) {
                console.error("Error loading people.json:", error);
            }
        };
        fetchPeople();
    }, []);

    const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const teacher = event.target.value;
        setSelectedCategory(teacher);
        const filtered = people.filter(person => person.teacher === teacher).map(person => person.name);
        setFilteredNames(filtered);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedName(event.target.value);
    };

    const setChair = async () => {
        if (typeof id !== "string" || !selectedName) {
            alert("名前を選択してください。");
            return;
        }

        try {
            const updatedPeople = people.map((person: Person) =>
                person.name === selectedName ? { ...person, seatID: id } : person
            );

            await fetch("/api/update-people", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ people: updatedPeople }),
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
                    <div className={styles.row}><h2 className={styles.h2}>登録予定座席</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>{position}</h2></div>
                    <div className={styles.row}><h2 className={styles.h2}></h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>担当の先生は?</h2></div>
                    <div className={styles.row}>
                        <div className={styles.cp_ipselect06}>
                            <select className={styles.cp_sl06} id="category-select" onChange={handleTeacherChange}>
                                <option>選択してください</option>
                                {teachers.map((teacher, index) => (
                                    <option key={index} value={teacher}>{teacher}</option>
                                ))}
                            </select>
                            <span className={styles.cp_sl06_selectbar}></span>
                        </div>
                    </div>
                    <div className={styles.row}><h2 className={styles.h2}></h2></div>
                    <div className={styles.row}><h2 className={styles.h2}>あなたの名前は?</h2></div>
                    <div className={styles.row}>
                        <div className={styles.cp_ipselect06}>
                            <select className={styles.cp_sl06}  id="sub-category-select" disabled={!selectedCategory} onChange={handleNameChange}>
                                <option>選択してください</option>
                                {filteredNames.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
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