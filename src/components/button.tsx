import styles from "@/styles/button.module.css";

type Props = {
    text: string,
    width: string,
    onClick: () => void;
}

export default function Button({text, width, onClick}: Props) {
    return (
        <button className={styles.button} style={{width}} onClick={onClick}>{text}</button>
    )
}