import React, { useState } from "react";
import { getUserSession } from "@/lib/session";
import { GetServerSideProps } from "next";
import styles from "@/styles/seat.module.css";
import Room from "@/components/room";
import { sendDatatoGas } from "@/hooks/sendDatatoGas";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = getUserSession;

type Student = {
    name: string;
    speedMaster: string;
    inCharge: string;
}

export default function Seat({email}: {email: string}) {
    const inChargeList: {[key: string]: Student[]} = {};
    const kind = "chair";
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getStudentData = async() => {
            const today = new Date();
            const pastDate = localStorage.getItem("today");
            const newDate = today.getMonth() + 1 + "_" + today.getDate();
            if(pastDate != newDate) {
                setIsLoading(true);
                const response = await sendDatatoGas({kind: kind, email: email});
                for(const student of response.studentList) {
                    if(student.inCharge) {
                        if(!inChargeList[student.inCharge]) {
                            inChargeList[student.inCharge] = [];
                        }
                        const newStudent: Student = {name: student.name, speedMaster: student.speedMaster, inCharge: student.inCharge};
                        inChargeList[student.inCharge].push(newStudent);
                    }
                }
                // 担当リストをローカルストレージ追加
                localStorage.setItem("inChargeList", JSON.stringify(inChargeList));
                // 初期状態座席作成
                localStorage.setItem("chairList", JSON.stringify(response.chairList));
                // 日付更新
                localStorage.setItem("today", newDate);
                setIsLoading(false);
                window.location.reload();
            }
        }

        // 初回時にマウント
        getStudentData();
        
    }, [])

    const layout1 = [["0", "0", "0", "0", "1_23", "1_12", "1_1"],
                    ["0", "0", "0", "0", "1_24", "1_13", "1_2"],
                    ["0", "0", "0", "0", "1_25", "1_14", "1_3"],
                    ["1_37", "1_36", "1_35", "1_34", "0", "0", "0"],
                    ["1_41", "1_40", "1_39", "1_38", "1_26", "1_15", "1_4"],
                    ["1_45", "1_44", "1_43", "1_42", "1_27", "1_16", "1_5"],
                    ["1_49", "1_48", "1_47", "1_46", "1_28", "1_17", "1_6"],
                    ["1_53", "1_52", "1_51", "1_50", "1_29", "1_18", "1_7"],
                    ["1_57", "1_56", "1_55", "1_54", "0", "0", "0"],
                    ["0", "1_60", "1_59", "1_58", "1_30", "1_19", "1_8"],
                    ["0", "1_63", "1_62", "1_61", "1_31", "1_20", "1_9"],
                    ["0", "0", "0", "0", "1_32", "1_21", "1_10"],
                    ["0", "0", "0", "0", "1_33", "1_22", "1_11"],
                    ];

    const layout2 = [["2_64", "2_65", "2_66", "2_67", "2_68", "2_69", "2_70"],
                    ["0", "0", "0", "0", "0", "0", "0"],
                    ["2_71", "2_72", "2_73", "2_74", "2_75", "2_76", "2_77"],
                    ["0", "0", "0", "0", "0", "0", "0"],
                    ["2_78", "2_79", "2_80", "2_81", "2_82", "2_83", "2_84"],
                    ["0", "0", "0", "0", "0", "0", "0"],
                    ["2_85", "2_86", "2_87", "2_88", "2_89", "2_90", "2_91"],
                    ["0", "0", "0", "0", "0", "0", "0"],
                    ["2_92", "2_93", "2_94", "2_95", "2_96", "2_97", "2_98"],
                    ["0", "0", "0", "0", "0", "0", "0"],
                    ["2_99", "2_100", "2_101", "2_102", "0", "0", "0"],
                    ];

    return(
        <div className={styles.background}>
            <div className={styles.loading} style={{display: isLoading ? "block" : "none"}}><p>ロード中...</p></div>
            <Room roomName="class1" layout={layout1} />
            <Room roomName="class2" layout={layout2} />
        </div>
    )
}

Seat.getLayout = (page: React.ReactNode) => page;