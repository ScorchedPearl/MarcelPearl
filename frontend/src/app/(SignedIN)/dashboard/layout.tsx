import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"
import styles from "./_components/dashboard.module.css"

const Layout=({children}:{children: React.ReactNode})=>{
    return(
        <div>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.menu}><Sidebar/></div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    )
}
export default Layout