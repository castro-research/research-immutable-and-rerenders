'use client'
import styles from './page.module.css'
// import TestOne from '@/components/test-1/page'
// import TestTwo from '@/components/test-2/page'
// import TestThree from '@/components/test-3/page'
import TestFour from '@/components/test-4/page'

export default function Home() {
    return (
        <main className={styles.main}>
            {/* <section>
                <TestOne />
            </section> */}
            {/* <section>
                <TestTwo />
            </section> */}
            {/* <section>
                <TestThree />
            </section> */}
            <section>
                <TestFour />
            </section>
        </main>
    )
}
