import styles from "./CinematicScenes.module.css";

type SceneHeaderProps = {
  eyebrow: string;
  index: string;
  title: string;
};

export default function SceneHeader({
  eyebrow,
  index,
  title,
}: SceneHeaderProps) {
  return (
    <header className={styles.sceneHeader}>
      <div className={styles.sceneIndex} aria-hidden="true">
        {index}
      </div>
      <div className={styles.sceneTitles}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.sectionRule} />
      </div>
    </header>
  );
}
