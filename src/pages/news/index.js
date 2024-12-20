import Link from "next/link";

function NewsPage() {
    return <>
        <h1>News Page</h1>
        <ul>
            <li>
                <Link href='/news/nextjs-is-a-great-framework'>NextJS is a Great Framework</Link>
                <Link href='/news/something-else'>Something Else</Link>
            </li>
        </ul>
    </>
}

export default NewsPage;