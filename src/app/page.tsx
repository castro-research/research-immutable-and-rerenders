'use client'
import styles from './page.module.css'
import TestOne from '@/components/test-1/page'
import StateApp from '@/components/state-app/page'

export default function Home() {
    return (
        <main className={styles.main}>
            <section>
                <TestOne />
            </section>
            <section>
                <StateApp />
            </section>
        </main>
    )
}
