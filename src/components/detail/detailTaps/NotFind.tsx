import styles from './NotFind.module.css'

const NotFind = () => {
    return (
        <p className={styles.not_find_message}>
        The information you are looking for does not exist. I'm sorry.
      </p>
    );
};

export default NotFind;