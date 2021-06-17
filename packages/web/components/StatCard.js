import styles from "../styles/StatCard.module.scss"

export default function StatCard(props) {
    return (
        <div className={styles.stat_card}>
            <h4>{props.value}</h4>
            <h6>{props.title}</h6>
        </div>
    )
}
